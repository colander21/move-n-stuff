import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { collection: "user_list", timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);

export default userModel;
