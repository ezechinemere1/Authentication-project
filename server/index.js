import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes/user.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(cookieParser());

app.use("/user/auth", UserRouter);

app.listen(process.env.PORT, () => {
  console.log("server listening at port 3000");
});

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });

