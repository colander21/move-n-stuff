import mongoose from "mongoose";
import boxModel from "./box.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("debug", true);

mongoose.connect(process.env.MONGO_URI).catch((error) => console.log(error));

// TODO: need to fix database schema first

// function getCollectionID(collectionName) {
//     boxModel.find()
// }

// function getBoxes(tag, collectionName) {
//   let collectionID;
//   getCollectionID(collectionName)
//     .then((result) => {
//       if (result == undefined) collectionID == undefined;
//       else collectionID = result;
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send("Internal Service Error.");
//     });
//   let promise2;
//   if (tag === undefined && collectionID === undefined) {
//     promise2 = boxModel.find();
//   } else if (tag && !collectionID) {
//     promise2 = findBoxByTag(tag);
//   } else if (job && !collectionID) {
//     promise2 = findBoxByCollection(collectionID);
//   }
//   return promise2;
// }
