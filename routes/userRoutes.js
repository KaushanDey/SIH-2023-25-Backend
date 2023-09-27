import express from "express";
import { addSubordinate, getSubordinates, login } from "../controllers/userController.js";


const userRouter = express.Router();


userRouter.get('/:name',getSubordinates);
userRouter.post('/login',login);
userRouter.post('/addSubordinate',addSubordinate);

export default userRouter;