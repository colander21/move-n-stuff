import mongoose from "mongoose";

const BoxSchema = new mongoose.Schema(
  {
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    collectionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "box_list", timestamps: true }
);

const boxModel = mongoose.model("Box", BoxSchema);

export default boxModel;
