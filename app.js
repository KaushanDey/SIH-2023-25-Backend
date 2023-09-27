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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

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
