import express from "express";
import { PORT, NODE_ENV } from "./config/env.ts";
import connectToDatabase from "./database/mongodb.ts";

const app = express();

app.use(express.json());

app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(
      `Server started at http://localhost:${PORT} in ${NODE_ENV} mode`
    );
  } catch (error) {
    console.error("Failed to start the server: ", error);
    process.exit(1);
  }
});
 