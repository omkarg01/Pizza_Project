import Joi from "joi";
import bcrypt from "bcryptjs";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JwtService from "../../services/JwtServices.js";
import User from "../../models/UserSchema.js";
import {REFRESH_KEY} from "../../config/index.js"
import RefreshDB from "../../models/RefreshToken.js";


const registerController = {
  // CHECKLIST
  // [+] validate the request
  // [+] authorise the request
  // [+] check if user is in the database already
  // [+] prepare model
  // [+] store in database
  // [+] generate jwt token
  // [+] send response
  async register(req, res, next) {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    console.log("registerController", "after validation");

    try {
      const exists = await User.exists({ email: req.body.email });

      if (exists) {
        return next(CustomErrorHandler.alreadyExists("email is already set"));
      }
    } catch (error  ) {
      return next(error);
    }
    console.log("registerController", "after checking email in the DB");

    const { name, email, password } = req.body;
    const hashpasswd = bcrypt.hashSync(password, 10);
    const user = new User({ name, email, password: hashpasswd });
    let access_token;
    let refresh_token;
    try {
      const saveData = await user.save();
      console.log(saveData._id);


      access_token = JwtService.generateToken({
        id: saveData._id,
        role: saveData.role,
      });

      refresh_token = JwtService.generateToken({
        id: saveData._id,
        role: saveData.role,
      }, REFRESH_KEY, {expiresIn : "1yr"});

      console.log(access_token);
    } catch (error) {
      return next(error);
    }

    console.log("registerController", "after saving user to DB");

    try {
      const refreshTokenSchema  = new RefreshDB({
        refresh_token : refresh_token
      })
  
      const saveData = await refreshTokenSchema.save();
      console.log(saveData);
  
    } catch (error) {
      return next(error);
    }
    

    res.json({
      msg: `Hello ${req.body.name}, you have registered successfully! `,
      token: access_token,
      refresh_token
    });
  },
};
export default registerController;
