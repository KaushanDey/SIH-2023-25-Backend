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
        let Username = existingAdmin.username;

        if(!isPasswordCorrect){
            return res.status(400).json({message: "Incorrect Password!!"});
        }
        return res.status(200).json({Username,isAdmin});
    }catch(err){
        return console.log(err);
    }
};

export const getSubordinates = async (req,res) => {

    const admin = req.params.Username;

    try{
        let existingAdmin = await Admin.findOne({admin});

        if(!existingAdmin){
            return res.status(404).json({message: "No Department head found by this name!!"});
        }
        let subordinates = existingAdmin.subordinates;
        let allSubordinates = [];
        let users = await User.find();
        for(let i=0;i<subordinates.length;i++){
            for(let j=0;j<users.length;i++){
                if(subordinates[i]===users[j].username){
                    allSubordinates.push(users[j]);
                }
            }
        }
        return res.status(200).json({allSubordinates});
    }catch(err){
        console.log(err);
    }
};
export const addSubordinate = async (req,res)=>{

    const {name,phoneNo,department,district,username,password,depHead} = req.body;

    let existingAdmin;

    try{
        existingAdmin = await Admin.findOne({depHead});
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
        existingAdmin.subordinates.push(username);
        await existingAdmin.save({session});
        session.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Server failed unexpectedly. Please try again."});
    }
    return res.status(200).json();
};

export const updateLocation = async (req,res)=>{

    const {Lat,Long} = req.body;
    const uid = req.params.uid;

    try{
        let user = await User.findByIdAndUpdate(uid,{
            Lat,
            Long
        });

        if(!user){
            return res.status(500).json();
        }
        return res.status(200).json({user});
    }catch(err){
        console.log(err);
    }
};

export const getAllLocations = async (req,res)=>{

    try{
        let user = await User.find();
        if(!user){
            return res.status(500).json();
        }
        return res.status(200).json({user});
    }catch(err){
        console.log(err);
    }
};