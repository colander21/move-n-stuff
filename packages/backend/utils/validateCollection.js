import mongoose from "mongoose";
import collectionModel from "../collections.js";

function validateCollection(collectionId) {
  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    return Promise.reject(new Error(`Invalid collectionId: ${collectionId}`));
  }

  return collectionModel.findById(collectionId).then((collection) => {
    if (!collection) {
      return Promise.reject(new Error("Collection does not exists"));
    }
    return true;
  });
}

export { validateCollection };
