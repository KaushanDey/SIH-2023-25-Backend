import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminName:{
    type: String,
    required: true,
  },
  adminPhoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  adminDepartment: {
    type: String,
    required: true,
  },
  adminDistrict: {
    type: String,
    required: true,
  },
  adminUsername: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: String,
    required: false,
    default: "False"
  },
  subordinates: [{
    type: String,
    required: false,
  }]
});

export default mongoose.model("Admin", adminSchema);

