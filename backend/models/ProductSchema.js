import mongoose from "mongoose";
import { APP_URL } from "../config/index.js";

// import {Schema} from "mongoose"
const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true,  get : (pizzaName)=>{
      return `${pizzaName}  XYZ`
    }},
    price: { type: Number, required:true},
    
    size: { type: String, required: true, get : (pizzaSize)=>{
      return `${pizzaSize}-size`
    } },
    image: { type: String, required: true, get: (imagePath) => {
       
      //  http://localhost:5000/C:\\Users\\IP330s\\Desktop\\WEB DEV\\pizza_project\\Backend\\uploads\\0.14134713155254675-1624349583003.png"
      return  `${APP_URL}/${imagePath}`
    }},
  },
  { timestamps: true,toJSON: {getters : true}}

);
export default mongoose.model("ProductDB", productSchema, "products");
