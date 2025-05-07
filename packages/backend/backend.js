import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import boxModel from "./box.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Connected to local host on 8000");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.set("debug", true);
mongoose
  .connect("mongodb+srv://movenstuff:MqPzUsOicq3ssRVF@move-n-stuff.qgnmlh4.mongodb.net/movenstuffdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));



  app.get("/boxes", (req, res) => {
    boxModel.find()
    .then((result) => {
        if (result == undefined){
            res.status(404).send("Resource not found.");
        } else {
          res.send(result);
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Internal Service Error.");
    });
  });