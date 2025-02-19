import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.ts";
import UserModel from "../models/user.model.ts";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized token" });

    const decoded: any = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authenticate;
