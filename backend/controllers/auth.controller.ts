import {
  DISCORD_REDIRECT_URL,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_GENERATED_URL,
  PORT,
} from "../config/env.ts";
import UserModel from "../models/user.model.ts";

export const discordLogin = async (req, res, next) => {
  try {
    const url = DISCORD_GENERATED_URL;
    res.redirect(url);
  } catch (error) {
    next(error);
  }
};

export const discordCallback = async (req, res, next) => {
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

    const user = {
      discordId: userData.id,
      discordUsername: userData.username,
      avatar: userData.avatar,
      email: userData.email,
    };

    const existingUser = await UserModel.findOne({ discordId: user.discordId });
    if (existingUser) {
      existingUser.discordUsername = user.discordUsername;
      await existingUser.save();
      return res.status(200).json({ success: true, user: existingUser });
    }

    const newUser = new UserModel(user);
    await newUser.save();

    res.status(200).json({ success: true, oauthData, userData });
  } catch (error) {
    next(error);
  }
};
