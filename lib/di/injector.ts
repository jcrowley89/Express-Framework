import "reflect-metadata";
import { Constructor } from "../types";

export class Injector {
  private depInstances: Map<string, Constructor<any>> = new Map<
    string,
    Constructor<any>
  >();

  resolve(target: Constructor<any>) {
    if (this.depInstances && this.depInstances.has(target.name)) {
      return this.depInstances.get(target.name);
    }

    const tokens: Constructor<any>[] =
      Reflect.getMetadata("design:paramtypes", target) || [];
    const injections: any[] = tokens.map((token) => Resolver.resolve(token));
    const instance = new target(...injections);
    this.depInstances.set(target.name, instance);

    return instance;
  }
}

export const Resolver = new Injector();
