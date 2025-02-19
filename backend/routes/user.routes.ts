import { Router } from "express";
import { getUsers } from "../controllers/user.controller.ts";
const userRouter = Router();

userRouter.get("/", getUsers);

export default userRouter;
