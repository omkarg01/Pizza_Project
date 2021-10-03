import Joi from "joi";
import { REFRESH_KEY } from "../../config/index.js";
import RefreshDB from "../../models/RefreshToken.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JwtService from "../../services/JwtServices.js";
import User from "../../models/UserSchema.js";
const refreshController = {
  async refresh(req, res, next) {
    console.log("hello i am refreshController");

    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = refreshSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    //refreshDB findOne
    try {
      const refresh_token = await RefreshDB.findOne({
        refresh_token: req.body.refresh_token,
      });
      if (!refresh_token) {
        return next(CustomErrorHandler.unAuthorized("unAuthorized token"));
      }
    } catch (error) {
      return next(error);
    }
    let payload;
    //verifying and decoding refershToken
    try {
      payload = JwtService.verifyToken(req.body.refresh_token, REFRESH_KEY);
      console.log(payload);
    } catch (error) {
      return next(error);
    }
    let user;
    try {
      user = await User.findOne({
        _id: payload.id,
      });
      console.log("userdatabase query ", user);
    } catch (error) {
      return next(error);
    }

    const access_token = JwtService.generateToken({
      id: user._id,
      role: user.role,
    });

    const refresh_token = JwtService.generateToken(
      {
        id: user._id,
        role: user.role,
      },
      REFRESH_KEY,
      { expiresIn: "1yr" }
    );

    try {
      const refreshTokenSchema  = new RefreshDB({
        refresh_token : refresh_token
      })
  
      const saveData = await refreshTokenSchema.save();
      console.log(saveData);
  
    } catch (error) {
      return next(error);
    }
    
    return res.json({
      new_access_token: access_token,
      new_refresh_token: refresh_token,
    });
    console.log("after refreshController sends response");
  },
};
export default refreshController;
