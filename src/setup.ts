import { Application, json, urlencoded } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import compression from "compression";
import hpp from "hpp";

import { log } from "./utils/Logger";
import routes from "./routes";
import cookieSession from "cookie-session";

// const GoogleStrategy: Strategy = new Strategy();

const PORT = process.env.PORT || 8080;
const loger = log.Log("app");

export class TaytureServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start() {
    this.passportSetup(this.app);
    this.middleware(this.app);
    this.routeMiddleware(this.app);
    this.startServer(this.app);
  }

  private passportSetup(app: Application) {
    app.use(
      cookieSession({
        name: "session",
        keys: [process.env.SECRET_ONE!, process.env.SECRET_TWO!],
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.ENV !== "dev",
      })
    );
  }

  private middleware(app: Application) {
    app.use(
      cors({
        origin: "*",
      })
    );

    app.use(hpp());

    app.use(compression());
    // limit json response
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true, limit: "50mb" }));
  }

  private routeMiddleware(app: Application) {
    routes(app);
  }

  private errorMiddleware() {}

  private startServer(app: Application) {
    app.listen(PORT, () => {
      loger.info(`Server started on port ${PORT}`);
    });
  }
}
