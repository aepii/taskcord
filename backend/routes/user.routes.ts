import { Router } from "express";
import { getUsers } from "../controllers/user.controller.ts";
import authenticate from "../middleware/auth.middleware.ts";
const userRouter = Router();

userRouter.get("/", authenticate, getUsers);

export default userRouter;
