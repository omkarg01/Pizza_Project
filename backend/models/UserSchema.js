import mongoose from "mongoose";

// import {Schema} from "mongoose"
const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required:true,unique:true},
    password: { type: String, required: true },
    role: { type: String, default: "Customer" },
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
