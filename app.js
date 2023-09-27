import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/connect.js";
import userRouter from "./routes/userRoutes.js";
import newsRouter from "./routes/newsRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(`/user`,userRouter);
app.use(`/news`,newsRouter);
app.use(cors());

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log("Example app listening on http://localhost:%s", PORT);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
