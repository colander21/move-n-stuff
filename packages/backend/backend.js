import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import boxModel from "./box.js";
import itemModel from "./item.js";
import userModel from "./user.js";
import collectionModel from "./collections.js";
import { validateUserIds } from "./utils/validateUsers.js";
import { validateCollection } from "./utils/validateCollection.js";
import { validateBox } from "./utils/validateBox.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Connected to local host on 8000");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.set("debug", true);
mongoose
  .connect(
    "mongodb+srv://movenstuff:MqPzUsOicq3ssRVF@move-n-stuff.qgnmlh4.mongodb.net/movenstuffdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

// test GET calls to see if backend will return properly
app.get("/boxes", (req, res) => {
  boxModel
    .find()
    .then((result) => {
      if (result == undefined) {
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

app.post("/boxes", (req, res) => {
  const { ownerID, collectionID } = req.body;
  validateUserIds(ownerID)
    .then(() => {
      return validateCollection(collectionID);
    })
    .then(() => {
      const newBox = new boxModel(req.body);
      return newBox.save();
    })
    .then((saved) => {
      res.status(201).send(saved);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(400).send(err.message);
    });
});

app.get("/items", (req, res) => {
  itemModel
    .find()
    .then((result) => {
      if (result == undefined) {
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

app.post("/items", (req, res) => {
  const boxID = req.body.boxID;
  validateBox(boxID)
    .then(() => {
      const newItem = new itemModel(req.body);
      return newItem.save();
    })
    .then((saved) => {
      res.status(201).send(saved);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(400).send(err.message);
    });
});

app.get("/users", (req, res) => {
  userModel
    .find()
    .then((result) => {
      if (result == undefined) {
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

app.post("/users", (req, res) => {
  //Does not do any checking other than making sure name is a field
  const newUser = new userModel(req.body);

  newUser
    .save()
    .then((savedUser) => {
      res.status(201).send(savedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Invalid user data");
    });
});

app.get("/collections", (req, res) => {
  collectionModel
    .find()
    .then((result) => {
      if (result == undefined) {
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

app.post("/collections", (req, res) => {
  /*Checks that all userIds are valid ids, in the DB, and not dups
  Does NOT check but should:
  - there is 1 and only 1 owner
  - unique (collectionName, owner) combo
  */
  const { collectionName, users } = req.body;
  const userIds = users.map((user) => user.userId);
  validateUserIds(userIds)
    .then(() => {
      const newCollection = new collectionModel({ collectionName, users });
      return newCollection.save();
    })
    .then((saved) => {
      res.status(201).send(saved);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(400).send(err.message);
    });
});
