import mongoose from "mongoose";
import containerModel from "../container.js";

function validateContainer(containerId) {
  if (!mongoose.Types.ObjectId.isValid(containerId)) {
    return Promise.reject(new Error(`Invalid containerId: ${containerId}`));
  }

  return containerModel.findById(containerId).then((container) => {
    if (!container) {
      return Promise.reject(new Error("Container does not exist."));
    }
    return true;
  });
}

function isContainerOwner(userID, containerID) {
  return containerModel
    .findById(containerID)
    .then((result) => {
      if (!result) {
        return false;
      }
      return result.users.some(
        (user) =>
          user.userId.toString() === userID.toString() && user.role === "owner"
      );
    })
    .catch((err) => {
      return Promise.reject(new Error("Error checking container ownership."));
    });
}

export { validateContainer, isContainerOwner };
