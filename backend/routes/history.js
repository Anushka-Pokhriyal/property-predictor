const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");

router.get("/", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [predictions, total] = await Promise.all([
      Prediction.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Prediction.countDocuments(),
    ]);

    res.json({
      success: true,
      data: predictions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Prediction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found." });
    res.json({ success: true, message: "Deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete." });
  }
});

module.exports = router;