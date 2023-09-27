import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
  location: {
    type: String,
    required: false
  },
  subordinates: [{
    type: String,
    required: true,
  }]
});

export default mongoose.model("Admin", adminSchema);

