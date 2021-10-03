import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JwtService from "../../services/JwtServices.js";
import Joi from "joi";
import User from "../../models/UserSchema.js";
import bcrypt from "bcryptjs";
import {REFRESH_KEY} from "../../config/index.js"
import RefreshDB from "../../models/RefreshToken.js";


const loginController = {
  async login(req, res, next) {
    console.log("hello i am loginController")
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    let access_token;
    let refresh_token;
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (!user) {
        return next(
          CustomErrorHandler.wrongCredentials("username is incorrect")
        );
      }
      const match = bcrypt.compareSync(req.body.password, user.password);
      if (!match) {
        return next(
          CustomErrorHandler.wrongCredentials("password is incorrect")
        );
      }

      access_token = JwtService.generateToken({
        id: user._id,
        role: user.role,
      });
      
      refresh_token = JwtService.generateToken({
        id: user._id,
        role: user.role,
      }, REFRESH_KEY, {expiresIn : "1yr"});



    } catch (error) {
      return next(error);
    }

    const refreshTokenSchema  = new RefreshDB({
      refresh_token : refresh_token
    })

    const saveData = await refreshTokenSchema.save();
    console.log(saveData);



    res.json({
      message: `${req.body.email} login successful`,
      access_token: access_token,
      refresh_token : refresh_token,
    });
  },
  async logout(req, res, next){

    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);
    if (error) {
       return next(error);
    }
    console.log("after not returning the error due to validation")
   try {
     await RefreshDB.deleteOne({refresh_token: req.body.refresh_token})
   } catch (error) {
     console.log("deleteone erroe catch")
     return next(error);
   }
   console.log("after deletion");
   res.json({msge : "your token is deleted"});
  }
  
};
export default loginController;
