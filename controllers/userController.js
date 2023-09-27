import mongoose from "mongoose";
import Admin from "../models/admin.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const loginAdmin = async (req,res)=>{

    const {adminUsername,adminPassword} = req.body;

    const secretKey = process.env.SECRET_KEY;
    try{
        let existingAdmin = await Admin.findOne({adminUsername});

        if(!existingAdmin){
            return res.status(404).json({message: "User does not exist.Please try signing up instead!!"});
        }

        const isPasswordCorrect = adminPassword===existingAdmin.adminPassword;
        const isUsernameCorrect = adminUsername===existingAdmin.adminUsername;
        let isAdmin = existingAdmin.isAdmin;
        let Username = existingAdmin.adminUsername;
        let District = existingAdmin.adminDistrict;

        if(!isPasswordCorrect && !isUsernameCorrect){
            return res.status(400).json({message: "Incorrect Credentials!!"});
        }

        jwt.sign(
            {existingAdmin},
            secretKey,
            {expiresIn: '3000s'},
            (err,token)=>{
                return res.status(200).json({Username,isAdmin,District,token});
            });
        
    }catch(err){
        return console.log(err);
    }
};
export const loginUser = async (req,res)=>{

    const {username,password} = req.body;
    try{
        let existingUser = await User.findOne({username});

        if(!existingUser){
            return res.status(404).json({message: "User does not exist!!"});
        }
    
        const isPasswordCorrect = password===existingUser.password;
        const isUsernameCorrect = username===existingUser.username;

        if(!isPasswordCorrect && !isUsernameCorrect){
            return res.status(400).json({message: "Incorrect Credentials!!"});
        }
        return res.status(200).json({existingUser});
    }catch(err){
        return console.log(err);
    }
};

export const getSubordinates = async (req,res) => {

    const adminUsername = req.params.adminUsername;
    console.log(adminUsername);

    try{
        let existingAdmin = await Admin.findOne({adminUsername});
        console.log(existingAdmin);

        if(!existingAdmin){
            return res.status(404).json({message: "No Department head found by this name!!"});
        }
        let subordinates = existingAdmin.subordinates;
        let allSubordinates = [];
        let users = await User.find();
        for(let i=0;i<subordinates.length;i++){
            for(let j=0;j<users.length;j++){
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

    const {name,phoneNo,department,district,username,password,adminUsername} = req.body;

    let existingAdmin;

    try{
        existingAdmin = await Admin.findOne({adminUsername});
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
        adminUsername
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
        let updatedUser = await User.findById(uid);
        user = updatedUser;
        return res.status(200).json({user});
    }catch(err){
        console.log(err);
    }
    
};

export const getAllLocations = async (req,res)=>{

    const district = req.params.district;
    try{
        let user = await User.find();
        let filteredUser = [];
        if(!user){
            return res.status(500).json();
        }

        for(let i=0;i<user.length;i++){
            if(district===user[i].district){
                filteredUser.push(user[i]);
            }
        }
        user = filteredUser;
        return res.status(200).json({user});
    }catch(err){
        console.log(err);
    }
};