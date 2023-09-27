import express from "express";
import { getMessages, postMessage } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.post('/post/:nid',postMessage);
chatRouter.get("/get/:nid",getMessages);

export default chatRouter;