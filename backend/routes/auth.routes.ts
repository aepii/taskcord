import { Router } from "express";
import { discordLogin, discordCallback } from "../controllers/auth.controller.ts";
const authRouter = Router();

authRouter.get("/login", discordLogin);
authRouter.get("/callback", discordCallback);

export default authRouter;
