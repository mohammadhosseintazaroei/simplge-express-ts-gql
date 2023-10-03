import { Application } from "./src/server";
new Application(process.env.APP_PORT ?? "3000");
