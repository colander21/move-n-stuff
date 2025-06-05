// import mongoose from "mongoose";
// commented out because userModel does not need to access the DB
// the model already inheritly has the mongoose connection in users.js
import userModel from "../user.js";

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByName(name) {
  return userModel.find({ username: name });
}

function getUserIDFromToken(name) {
  return findUserByName(name).then((result) => {
    return result[0]["_id"];
  });
}

export default {
  findUserById,
  findUserByName,
  getUserIDFromToken,
};
