import express from "express";
import { addSubordinate, getSubordinates, login } from "../controllers/userController.js";
import cors from "cors";

const userRouter = express.Router();
app.use(cors({
    origin:"*",
    methods:['GET','POST','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization','Accept','Origin','X-Requested-With'],
  }));
app.options('*',cors());

userRouter.get('/:name',getSubordinates);
userRouter.post('/login',login);
userRouter.post('/addSubordinate',addSubordinate);

export default userRouter;