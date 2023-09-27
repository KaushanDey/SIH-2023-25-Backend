import mongoose from "mongoose";

const connectDB = (uri)=>{
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
export default connectDB;