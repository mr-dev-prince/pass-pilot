import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  label: { type: String, required: true },
  application: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Password", passwordSchema);
