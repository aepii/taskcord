import { config } from "dotenv";

interface Config_I {
  PORT: string;
  NODE_ENV: string;
  DB_URI: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  DISCORD_REDIRECT_URI: string;
}

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const envConfig: Config_I = {
  PORT: process.env.PORT || "5000",
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URI: process.env.DB_URI || "",
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || "",
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || "",
  DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI || "",
};

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_REDIRECT_URI,
} = envConfig;
