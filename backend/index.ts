import express from "express";
import { PORT, NODE_ENV } from "./config/env.ts";
import connectToDatabase from "./database/mongodb.ts";
import errorMiddleware from "./middleware/error.middleware.ts";
import authRouter from "./routes/auth.routes.ts";
import userRouter from "./routes/user.routes.ts";

const app = express();

app.use(express.json());
app.use(errorMiddleware);

app.use("/api/v1/auth/discord", authRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Taskcord API");
});

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
