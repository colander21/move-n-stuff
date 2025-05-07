import mongoose from "mongoose";

const BoxSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      trim: true,
    },
    ownerID: {
      type: Number,
      required: true,
      trim: true,
    },
    collectionID: {
      type: Number,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { collection: "box_list",
    timestamps: true
   }
);

const boxModel = mongoose.model("Box", BoxSchema);

export default boxModel;