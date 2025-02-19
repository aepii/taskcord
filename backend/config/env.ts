import { config } from "dotenv";

interface Config_I {
  PORT: string;
  NODE_ENV: string;
  DB_URI: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  DISCORD_REDIRECT_URL: string;
  DISCORD_GENERATED_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CLIENT_REDIRECT_URL: string;
}

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const envConfig: Config_I = {
  PORT: process.env.PORT || "5000",
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URI: process.env.DB_URI || "",
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || "",
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || "",
  DISCORD_REDIRECT_URL: process.env.DISCORD_REDIRECT_URL || "",
  DISCORD_GENERATED_URL: process.env.DISCORD_GENERATED_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "default_jwt_secret", 
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  CLIENT_REDIRECT_URL: process.env.CLIENT_REDIRECT_URL || ""
};

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_REDIRECT_URL,
  DISCORD_GENERATED_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CLIENT_REDIRECT_URL
} = envConfig;