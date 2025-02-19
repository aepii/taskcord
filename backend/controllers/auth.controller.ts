import { DISCORD_REDIRECT_URI } from "../config/env.ts";

export const discordLogin = async (req, res) => {
  const url = DISCORD_REDIRECT_URI;
  res.redirect(url);
};

export const discordCallback = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res
      .status(400)
      .json({ success: false, error: "Code not provided." });
  }
  res.status(200).json({ success: true, code });
};
