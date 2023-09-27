import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({

    news: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isApproved: {
        type: String,
        required: false,
        default: "False"
    }
});

export default mongoose.model("New",newsSchema);