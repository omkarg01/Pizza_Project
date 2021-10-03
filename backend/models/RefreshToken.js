import mongoose from "mongoose";

const refreshSchema = mongoose.Schema({
  refresh_token: { type: String, required: true, unique: true },
});

export default mongoose.model("RefreshDB", refreshSchema, "refresh_db" );
