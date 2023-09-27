import express from "express";
import { addSubordinate, getAllLocations, getSubordinates, loginAdmin, loginUser, updateLocation } from "../controllers/userController.js";


const userRouter = express.Router();


userRouter.get('/:adminUsername',getSubordinates);
userRouter.get('/location',getAllLocations);
userRouter.post('/loginAdmin',loginAdmin);
userRouter.post('/loginUser',loginUser);
userRouter.post('/addSubordinate',addSubordinate);
userRouter.post('/updateLocation/:uid',updateLocation);

export default userRouter;