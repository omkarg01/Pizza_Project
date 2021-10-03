import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtServices.js";
const auth = async (req, res, next) => {
  console.log("hello i am auth middleware");
  const authHeader = req.headers.authorization;
    console.log(authHeader);
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized("authHeader is not found"));
  }
  const access_token = authHeader.slice(7);

  try {
    const payload = await JwtService.verifyToken(access_token);
    // console.log(payload);
    res.locals.payloadData = payload;  //1 way
    req.payloadData = payload;  //2 way
    // console.log("from auth ",req.)
  } catch (err) {
    return next(err);
  }
  next() //execute the next middle ware or controller 
};

export default auth;
