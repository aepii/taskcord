import express from "express";
import { PORT, NODE_ENV, CLIENT_REDIRECT_URL } from "./config/env.ts";
import connectToDatabase from "./database/mongodb.ts";
import errorMiddleware from "./middleware/error.middleware.ts";
import authRouter from "./routes/auth.routes.ts";
import userRouter from "./routes/user.routes.ts";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

const corsOptions = {
  origin: CLIENT_REDIRECT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

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
