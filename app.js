import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/connect.js";
import userRouter from "./routes/userRoutes.js";
import newsRouter from "./routes/newsRoutes.js";
import cors from "cors";
import chatRouter from "./routes/chatRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin:"*",
  methods:["GET","POST","PUT","OPTIONS"],
  credentials: true,
  allowedHeaders:['Content-Type','Authorization','Accept','Origin','X-Requested-With'],
}));
app.options('*',cors());
app.use(`/user`,userRouter);
app.use(`/news`,newsRouter);
app.use(`/chat`,chatRouter);

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

