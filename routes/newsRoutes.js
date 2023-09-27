import express from "express";
import { getNews, postNews } from "../controllers/newsController.js";
import cors from "cors";

const newsRouter = express.Router();
app.use(cors({
    origin:"*",
    methods:['GET','POST','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization','Accept','Origin','X-Requested-With'],
  }));
app.options('*',cors());

newsRouter.get('/',getNews);
newsRouter.post('/postNews',postNews);

export default newsRouter;