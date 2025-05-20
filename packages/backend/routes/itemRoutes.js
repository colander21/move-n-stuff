import express from "express";
import Item from "../item.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { boxID } = req.query;
    const items = boxID ? await Item.find({ boxID }) : await Item.find();

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items." });
  }
});

export default router;
