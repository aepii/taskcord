import {
  DISCORD_REDIRECT_URL,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_GENERATED_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CLIENT_REDIRECT_URL,
  NODE_ENV,
} from "../config/env.ts";
import UserModel from "../models/user.model.ts";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const discordLogin = async (req, res, next) => {
  try {
    const url = DISCORD_GENERATED_URL;
    res.redirect(url);
  } catch (error) {
    next(error);
  }
};

export const discordCallback = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { code } = req.query;
    if (!code) {
      throw new Error("Code not provided.");
    }

    const params = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: DISCORD_REDIRECT_URL,
    });

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to fetch access token.");
    }

    const oauthData = await tokenResponse.json();
    const accessToken = oauthData.access_token;

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user information.");
    }

    const userData = await userResponse.json();

    const {
      id: discordId,
      username: discordUsername,
      avatar,
      email,
    } = userData;

    let user = await UserModel.findOne({ discordId }).session(session);
    if (user) {
      user.discordUsername = discordUsername;
      user.avatar = avatar;
      user.email = email;
      await user.save({ session });
    } else {
      user = new UserModel({
        discordId,
        discordUsername,
        avatar,
        email,
      });
      await user.save({ session });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions);

    await session.commitTransaction();
    session.endSession();

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV,
      maxAge: 1000 * 60 * 60 * 24 * 1,
      sameSite: "none",
    });
    res.redirect(CLIENT_REDIRECT_URL);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
