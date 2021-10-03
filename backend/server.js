import { PORT, DB_URL } from "./config/index.js";
import fs from "fs";
import express from "express";
import index from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import mongoose from "mongoose";
const app = express();
import { fileURLToPath } from "url";
import { dirname } from "path";

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected...");
});


app.use(express.json());
app.use("/api", index);
app.use("/uploads",express.static("C:/Users/IP330s/Desktop/WEB_DEV/pizza_project/Backend/uploads"))
app.use("/images", express.static("C:/Users/IP330s/Pictures/Snipes"))

app.use(errorHandler);

app.listen(PORT, () => console.log(`SERVER IS LSITENING ON PORT NO ${PORT}`));
