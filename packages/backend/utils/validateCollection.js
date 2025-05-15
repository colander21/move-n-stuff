import mongoose from "mongoose";
import containerModel from "../container.js";

function validateContainer(containerId) {
  if (!mongoose.Types.ObjectId.isValid(containerId)) {
    return Promise.reject(new Error(`Invalid containerId: ${containerId}`));
  }

  return containerModel.findById(containerId).then((container) => {
    if (!container) {
      return Promise.reject(new Error("Container does not exists"));
    }
    return true;
  });
}

export { validateContainer };
