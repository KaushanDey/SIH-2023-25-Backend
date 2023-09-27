import express from "express";
import { getNews, getNewsByType, postNews } from "../controllers/newsController.js";


const newsRouter = express.Router();

newsRouter.get('/:district',getNews);
newsRouter.get('/type/:type',getNewsByType);
newsRouter.post('/postNews',postNews);

export default newsRouter;
