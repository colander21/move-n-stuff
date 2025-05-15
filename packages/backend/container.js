import mongoose from "mongoose";

const ContainerSchema = new mongoose.Schema(
  {
    containerName: {
      type: String,
      required: true,
      trim: true,
    },
    users: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["owner", "editor", "viewer"],
          required: true,
        },
      },
    ],
  },
  { collection: "container_list", timestamps: true }
);

const containerModel = mongoose.model("Container", ContainerSchema);

export default containerModel;
