import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/user/register", UserController.prototype.googleRegister);
userRouter.post("/user/login", UserController.prototype.googleRegister);
// userRouter.get("/user/logout");

export default userRouter;
