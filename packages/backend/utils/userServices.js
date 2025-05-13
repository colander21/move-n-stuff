import mongoose from "mongoose";
import userModel from "../user.js";

function findUserById(id) {
  return userModel.findById(id);
}

export default {
  findUserById,
};
