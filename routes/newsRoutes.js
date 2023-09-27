import express from "express";
import { getNews, postNews } from "../controllers/newsController.js";


const newsRouter = express.Router();


newsRouter.get('/',getNews);
newsRouter.post('/postNews',postNews);

export default newsRouter;