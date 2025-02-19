import { config } from "dotenv";

interface Config_I {
  PORT: string;
  NODE_ENV: string;
  DB_URI: string;
}

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

const envConfig: Config_I = {
  PORT: process.env.PORT || "3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URI: process.env.DB_URI || "",
};

export const { PORT, NODE_ENV, DB_URI } = envConfig;
