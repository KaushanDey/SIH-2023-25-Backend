import mongoose from "mongoose";
import Admin from "../models/admin.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const login = async (req,res)=>{

    const {username,password} = req.body;
    try{
        let existingAdmin = await Admin.findOne({username});

        if(!existingAdmin){
            return res.status(404).json({message: "User does not exist.Please try signing up instead!!"});
        }
    
        const isPasswordCorrect = password===existingAdmin.password;
        let isAdmin = existingAdmin.isAdmin;
        let Name = existingAdmin.username;

        if(!isPasswordCorrect){
            return res.status(400).json({message: "Incorrect Password!!"});
        }
        return res.status(200).json({Name,isAdmin});
    }catch(err){
        return console.log(err);
    }
};

export const getSubordinates = async (req,res) => {

    const admin = req.params.name;

    try{
        let existingAdmin = await Admin.findOne(admin);

        if(!existingAdmin){
            return res.status(404).json({message: "No Department head found by this name!!"});
        }
        let subordinates = await existingAdmin.subordinates;
        return res.status(200).json({subordinates});
    }catch(err){
        console.log(err);
    }
};
export const addSubordinate = async (req,res)=>{

    const {name,phoneNo,department,district,username,password,depHead} = req.body;

    let existingAdmin;

    try{
        existingAdmin = await Admin.findOne(depHead);
    }catch(err){
        console.log(err);
    }

    if(!existingAdmin){
        return res.status(400).json({message: "No Department head by that name!!"});
    }

    const user = new User({
        name,
        phoneNo,
        department,
        district,
        username,
        password,
        depHead
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await user.save({session});
        existingAdmin.subordinates.push(user);
        await existingAdmin.save({session});
        session.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Server failed unexpectedly. Please try again."});
    }
    return res.status(200).json();
};