import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "user_list", timestamps: true }
);

const NewUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    confirmPassword: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "user_list", timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);
const newUserModel = mongoose.model("NewUser", NewUserSchema);

export default { userModel, newUserModel };
