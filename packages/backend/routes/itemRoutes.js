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

router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found." });
    }
    res.json({ message: "Item deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item." });
  }
});

export default router;
