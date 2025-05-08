import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    boxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Box",
      required: true,
      trim: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "item_list", timestamps: true },
);

const itemModel = mongoose.model("Item", ItemSchema);

export default itemModel;
