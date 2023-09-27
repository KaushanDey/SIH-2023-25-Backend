import express from "express";
import { addSubordinate, getAllLocations, getSubordinates, login, updateLocation } from "../controllers/userController.js";


const userRouter = express.Router();


userRouter.get('/:UserName',getSubordinates);
userRouter.get('/location',getAllLocations);
userRouter.post('/login',login);
userRouter.post('/addSubordinate',addSubordinate);
userRouter.post('/updateLocation/:uid',updateLocation);

export default userRouter;