import { JWT_TOKEN } from "../config/index.js";
import jwt from "jsonwebtoken";

class JwtService {
  static generateToken(payload, secret = JWT_TOKEN, expiry = { expiresIn: "1h" }) {
    
    const tokenGenerated = jwt.sign(payload, secret, expiry);
    return tokenGenerated;
  }

  static verifyToken(token, secret = JWT_TOKEN){
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  }


}

export default JwtService;
