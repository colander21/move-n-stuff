import mongoose from "mongoose";
import boxModel from "../box.js";

function validateBox(boxId) {
  if (!mongoose.Types.ObjectId.isValid(boxId)) {
    return Promise.reject(new Error(`Invalid boxId: ${boxId}`));
  }

  return boxModel.findById(boxId).then((box) => {
    if (!box) {
      return Promise.reject(new Error("Box does not exists"));
    }
    return true;
  });
}

export { validateBox };
