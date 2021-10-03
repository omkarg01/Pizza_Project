import { DEBUG_MODE } from "../config/index.js";
import pkg from 'joi';
const { ValidationError } = pkg;
import CustomErrorHandler from "../services/CustomErrorHandler.js"

const errorHandler = (err, req, res, next) => {
  console.log("errorHandler")
  let statusCode = 500;
  let data = {
    message: "Internal server error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler){
    statusCode = err.statusCode
    data = {
      message : err.message,
    }
  }
  

  return res.status(statusCode).json(data);
  console.log("end of error handler")
};

export default errorHandler;
