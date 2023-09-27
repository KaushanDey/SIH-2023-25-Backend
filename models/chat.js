import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    nid:{
        type: String,
        required: true
    },
    messages:[{
        type: String,
        required: false
    }]
});

export default mongoose.model("Chat",chatSchema);