const fs = require("fs/promises");
const path = require("path");
const join = path.join;

(async () => {
  const newName = process.argv[2];

  console.log(`Creating controller: ${newName}.`);

  const controllersPath = join(__dirname, "..", "..", "controllers");
  const indexPath = join(controllersPath, "index" + ".ts");

  try {
    await fs.access(indexPath);
    console.log("Creating index file.");
    await fs.unlink(indexPath);
  } catch {
    console.log("Index already exists.");
  }

  const filenames = await fs.readdir(controllersPath);

  const imports = filenames.map(
    (f) => `import ${f.split(".")[0]} from "./${f.split(".")[0]}";`
  );

  const indexContent = `${imports.length > 0 ? imports.join(";\n") : ""}${
    imports.length > 0 ? "\n" : ""
  }import ${newName}Controller from './${newName}Controller';

export const controllers = [
    ${
      filenames.length > 0
        ? filenames.map((f) => `${f.split(".")[0]}`).join(",\n\t")
        : ""
    }${filenames.length > 0 ? ",\n\t" : ""}${newName}Controller,
];
`;

  await fs.writeFile(
    join(__dirname, "..", "..", "controllers", "index" + ".ts"),
    indexContent
  );

  const controllerContent = `import { Request, Response } from "express";
import Controller from "../lib/decorators/controllerDecorator";
import { Get } from "../lib/decorators/routeDecorators";

@Controller("/${newName.toLowerCase()}")
export default class ${newName}Controller {

  @Get("/")
  public index(req: Request, res: Response): void {
    res.json({ hello: "world" });
    return;
  }

}

  `;

  await fs.writeFile(
    join(__dirname, "..", "..", "controllers", newName + "Controller.ts"),
    controllerContent
  );

  console.log("Done.");
})();
