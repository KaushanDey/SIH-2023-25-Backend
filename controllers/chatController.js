import mongoose from "mongoose";
import Chat from "../models/chat.js";

export const postMessage = async (req,res)=>{

    const {time,message,sender} = req.body;
    const nid = req.params.nid;

    const modifiedMessage = `${message}%${sender}|${time}`;

    try{
        let existingChat = await Chat.findOne({nid});

        if(!existingChat){
            const chat = new Chat({
                nid,
                messages: [modifiedMessage]
            });
            const session = await mongoose.startSession();
            session.startTransaction();
            await chat.save({session});
            session.commitTransaction();
            return res.status(200).json({chat}); 
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        existingChat.messages.push(modifiedMessage);
        await existingChat.save({session});
        session.commitTransaction();
        let chat = existingChat;
        return res.status(200).json({chat}); 

    }catch(err){
        console.log(err);
    }
};

export const getMessages = async (req,res)=>{

    const nid = req.params.nid;

    try{
        let chat = await Chat.findOne({nid});
        if(!chat){
            return res.status(200).json();
        }
        return res.status(200).json({chat});
    }catch(err){
        console.log(err);
    }

};