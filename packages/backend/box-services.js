import mongoose from "mongoose";
import boxModel from "./box.js";

mongoose.set("debug", true);

mongoose.set("debug", true);
mongoose
  .connect(
    "mongodb+srv://movenstuff:MqPzUsOicq3ssRVF@move-n-stuff.qgnmlh4.mongodb.net/movenstuffdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .catch((error) => console.log(error));

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
