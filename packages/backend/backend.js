import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import boxModel from "./box.js";
import itemModel from "./item.js";
import userModel from "./user.js";
import containerModel from "./container.js";
import { validateUserIds } from "./utils/validateUsers.js";
import { validateContainer } from "./utils/validateContainer.js";
import { validateBox } from "./utils/validateBox.js";
import userServices from "./utils/userServices.js";
import dotenv from "dotenv";
import { registerUser, loginUser, authenticateUser } from "./auth.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Connected to local host on 8000");
});

app.listen(process.env.PORT || port, () => {
  console.log(`REST API is listening.`);
});

mongoose.set("debug", true);
mongoose.connect(process.env.MONGO_URI).catch((error) => console.log(error));

// test GET calls to see if backend will return properly
app.get("/boxes", authenticateUser, (req, res) => {
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

app.get("/boxes/:id", authenticateUser, (req, res) => {
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

app.get("/boxes/:id/info", authenticateUser, (req, res) => {
  const boxID = req.params.id;
  boxModel
    .findById(boxID)
    .then((box) => {
      if (!box) {
        return res.status(404).send("Box not found.");
      }
      res.status(200).json(box);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Internal Server Error.");
    });
});

app.post("/boxes", authenticateUser, (req, res) => {
  console.log("RAW req.body:", req.body);
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

//gets items for box with specific id
app.get("/items", authenticateUser, async (req, res) => {
  try {
    const { boxID } = req.query;
    const items = boxID
      ? await itemModel.find({ boxID })
      : await itemModel.find();

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items." });
  }
});

//deletes items by id
app.delete("/items/:id", authenticateUser, async (req, res) => {
  try {
    const deletedItem = await itemModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found." });
    }
    res.json({ message: "Item deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete item." });
  }
});

app.post("/items", authenticateUser, async (req, res) => {
  const { boxID, itemName, quantity, category } = req.body;

  try {
    await validateBox(boxID);

    const existingItem = await itemModel.findOne({ boxID, itemName });

    if (existingItem) {
      existingItem.quantity += quantity;
      const updateItem = await existingItem.save();
      return res.status(200).json(updateItem);
    } else {
      const newItem = new itemModel({ boxID, itemName, quantity, category });
      const saveItem = await newItem.save();
      return res.status(201).json(saveItem);
    }
  } catch (err) {
    console.error(err.messaage);
    res.status(400).send(err.message);
  }
});

app.get("/users", authenticateUser, (req, res) => {
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

app.get("/users/:id", authenticateUser, (req, res) => {
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

app.post("/users", authenticateUser, (req, res) => {
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

app.get("/containers", authenticateUser, (req, res) => {
  userServices
    .findUserByName(req.username)
    .then((result) => {
      const UID_FROM_TOKEN = result[0]["_id"];
      containerModel
        .find({ users: { $elemMatch: { userId: UID_FROM_TOKEN } } })
        .then((result) => {
          if (result == undefined) {
            res.status(404).send("Resource not found.");
          } else {
            res.send(result);
          }
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    });
});

app.get("/containers/:id", authenticateUser, (req, res) => {
  userServices
    .findUserByName(req.username)
    .then((result) => {
      const UID_FROM_TOKEN = result[0]["_id"];
      const container = req.params["id"];
      containerModel.findById(container).then((found) => {
        console.log(found);
        console.log(UID_FROM_TOKEN);
        if (!found) {
          return res.status(404).send("Container not found.");
        }

        if (
          found.users.some(
            (user) => user.userId.toString() === UID_FROM_TOKEN.toString()
          )
        ) {
          boxModel.find({ containerID: container }).then((boxes) => {
            res.status(200).send(boxes);
          });
        } else {
          console.error("User does not have access to container.");
          res.status(403).send("Forbidden access to container.");
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error.");
    });
});

app.post("/containers", authenticateUser, (req, res) => {
  userServices
    .findUserByName(req.username)
    .then((result) => {
      const UID_FROM_TOKEN = result[0]["_id"];
      const { containerName } = req.body;
      const users = [
        {
          userId: UID_FROM_TOKEN,
          role: "owner",
        },
      ];
      const userIds = users.map((user) => user.userId);
      console.log(userIds);
      validateUserIds(userIds)
        .then(() => {
          const newContainer = new containerModel({ containerName, users });
          return newContainer.save();
        })
        .then((saved) => {
          res.status(201).send(saved);
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(400).send(err.message);
    });
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

function findAll(name) {
  const boxPromise = boxModel.find({ tag: { $regex: name, $options: "i" } });
  const containerPromise = containerModel.find({
    containerName: { $regex: name, $options: "i" },
  });
  const itemPromise = itemModel.find({
    itemName: { $regex: name, $options: "i" },
  });

  return Promise.all([boxPromise, containerPromise, itemPromise]).then(
    ([boxes, containers, items]) => {
      return { boxes, containers, items };
    }
  );
}

app.get("/search", authenticateUser, (req, res) => {
  const filter = req.query.name || "";
  findAll(filter)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});
