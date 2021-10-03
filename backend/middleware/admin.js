
import User from "../models/UserSchema.js"
import CustomErrorHandler from "../services/CustomErrorHandler.js";
const admin = async (req, res, next) => {
  console.log("hello i am admin");
    console.log("from admin", res.locals.payloadData.id)
  try {
    const user = await User.findOne({_id : res.locals.payloadData.id });
    if(user.role === 'Admin'){
       return next();
    }
    else{
        return next(CustomErrorHandler.unAuthorized("Only admin can access the products"))
    }
    

  } catch (error) {
    return next(error);
  }
};
export default admin;
