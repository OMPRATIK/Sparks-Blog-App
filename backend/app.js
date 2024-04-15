import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import connectDB from "./db/connect.js";

import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(xss());

import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import postRouter from "./routes/post.js";

import authorizationMiddleware from "./middleware/auth.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", authorizationMiddleware, profileRouter);
app.use("/api/v1/post", authorizationMiddleware, postRouter);

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
