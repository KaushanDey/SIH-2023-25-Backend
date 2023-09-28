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
    lat: {
        type: Number,
        required: true,
        default: 0.0
    },
    lng: {
        type: Number,
        required: true,
        default: 0.0
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