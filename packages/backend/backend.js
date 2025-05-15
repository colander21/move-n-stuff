import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import boxModel from "./box.js";
import itemModel from "./item.js";
// import models from "./user.js";
import userModel from "./user.js";
// const { userModel, newUserModel } = models;
import containerModel from "./container.js";
import { validateUserIds } from "./utils/validateUsers.js";
import { validateContainer } from "./utils/validateContainer.js";
import { validateBox } from "./utils/validateBox.js";
import userServices from "./utils/userServices.js";
import dotenv from "dotenv";

dotenv.config();

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
mongoose.connect(process.env.MONGO_URI).catch((error) => console.log(error));

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

app.get("/boxes/:id", (req, res) => {
  const box = req.params["id"];
  itemModel
    .find({ boxID: box })
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    });
});

app.post("/boxes", (req, res) => {
  const { ownerID, containerID } = req.body;
  validateUserIds(ownerID)
    .then(() => {
      return validateContainer(containerID);
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

app.get("/users/:id", (req, res) => {
  const userID = req.params["id"];
  userServices
    .findUserById(userID)
    .then((result) => {
      if (!result) {
        res.status(404).send(`User ${userID} not found.`);
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error.");
    });
});

app.post("/users", (req, res) => {
  // Does not do any checking other than making sure name is a field
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

app.get("/containers", (req, res) => {
  containerModel
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
      res.status(500).send("Internal Server Error.");
    });
});

app.get("/containers/:id", (req, res) => {
  const container = req.params["id"];
  boxModel
    .find({ containerID: container })
    .then((boxes) => {
      res.status(200).send(boxes);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error.");
    });
});

app.post("/containers", (req, res) => {
  /*Checks that all userIds are valid ids, in the DB, and not dups
  Does NOT check but should:
  - there is 1 and only 1 owner
  - unique (containerName, owner) combo
  */
  const { containerName, users } = req.body;
  const userIds = users.map((user) => user.userId);
  validateUserIds(userIds)
    .then(() => {
      const newContainer = new containerModel({ containerName, users });
      return newContainer.save();
    })
    .then((saved) => {
      res.status(201).send(saved);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(400).send(err.message);
    });
});
