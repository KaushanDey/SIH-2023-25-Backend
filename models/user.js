import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: String,
    required: false,
    default: "False"
  },
  depHead:{
    type: String,
    required: false
  },
  Lat: {
    type: Number,
    required: false,
    default: 0
  },
  Long: {
    type: Number,
    required: false,
    default: 0
  }
});

export default mongoose.model("User", userSchema);

