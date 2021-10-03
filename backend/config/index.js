import dotenv from "dotenv";
dotenv.config();
 
export const { PORT, DEBUG_MODE,  DB_URL, JWT_TOKEN, REFRESH_KEY, APP_URL } = process.env;
