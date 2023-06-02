import express from "express";
import { PostController } from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.post("/post/create", PostController.prototype.create);
postRouter.get("/post/read", PostController.prototype.read);
postRouter.get("/post/read5", PostController.prototype.read5);
postRouter.get("/post/read/:id", PostController.prototype.readOne);
// postRouter.get("/post/logout");

export default postRouter;
