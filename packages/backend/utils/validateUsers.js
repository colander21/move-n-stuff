import mongoose from "mongoose";
import userModel from "../user.js";

function validateUserIds(userIds) {
  const uniqueUserIds = [...new Set(userIds)];
  if (uniqueUserIds.length !== userIds.length) {
    return Promise.reject(new Error("Duplicate userIds"));
  }
  const invalidId = uniqueUserIds.find(
    (id) => !mongoose.Types.ObjectId.isValid(id),
  );

  if (invalidId) {
    return Promise.reject(new Error(`Invalid userId: ${invalidId}`));
  }

  return userModel.find({ _id: { $in: uniqueUserIds } }).then((users) => {
    if (users.length !== uniqueUserIds.length) {
      return Promise.reject(new Error("One or more userIds do not exist."));
    }
    return true;
  });
}

export { validateUserIds };
