import express, { Application as ExApplication, Handler } from "express";
import { controllers } from "../web/controllers";
import { MetadataKeys } from "./enums/metadataKeys";
import { IRouter } from "./decorators/routeDecorators";
import { Resolver } from "./di/injector";
import { AuthorizeMiddleware } from "./middleware/authorize";

class Application {
  private readonly _instance: ExApplication;

  get instance(): ExApplication {
    return this._instance;
  }

  constructor() {
    this._instance = express();
    this._instance.use(express.json());
    this.registerRouters();
  }

  private registerRouters() {
    const info: Array<{ api: string; handler: string }> = [];

    controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } =
        Resolver.resolve(controllerClass) as any;

      const basePath: string =
        "/api" + Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      );
      const policies: string[] =
        Reflect.getMetadata(MetadataKeys.POLICIES, controllerClass) || [];

      const authorizeMiddleware = Resolver.resolve(AuthorizeMiddleware);

      const authorize = authorizeMiddleware.apply();

      const middleware = policies.length > 0 ? [authorize(policies)] : [];

      const exRouter = express.Router();

      routers.forEach(({ method, path, handlerName }) => {
        exRouter[method](
          path,
          middleware,
          controllerInstance[String(handlerName)].bind(controllerInstance)
        );

        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });

      this._instance.use(basePath, exRouter);
    });

    console.table(info);
  }
}

export default new Application();
