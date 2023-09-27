import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/connect.js";
import userRouter from "./routes/userRoutes.js";
import newsRouter from "./routes/newsRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(`/${process.env.API_KEY}/user`,userRouter);
app.use(`/${process.env.API_KEY}/news`,newsRouter);

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
