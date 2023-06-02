import { Application } from "express";
import userRouter from "./features/user/routes/user.router";
import postRouter from "./features/post/routes/post.route";
const BASE_PATH = "/api/v1";

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, userRouter);
    app.use(BASE_PATH, postRouter);
  };
  routes();
};
