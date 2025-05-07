import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: true,
      trim: true,
    },
    users: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            role: { type: String, enum: ['owner', 'editor', 'viewer'], required: true}
        }
    ]
  },
  { collection: "collection_list", timestamps: true }
);

const collectionModel = mongoose.model("Collection", CollectionSchema);

export default collectionModel;
