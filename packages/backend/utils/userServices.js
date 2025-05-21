// import mongoose from "mongoose";
// commented out because userModel does not need to access the DB
// the model already inheritly has the mongoose connection in users.js
import userModel from "../user.js";

function findUserById(id) {
  return userModel.findById(id);
}

export default {
  findUserById,
};
