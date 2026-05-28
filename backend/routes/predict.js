const express = require("express");
const router = express.Router();
const Prediction = require("../models/Prediction");
const { predict } = require("../ml/predictor");

router.post("/", async (req, res) => {
  try {
    const { area, location, bedrooms } = req.body;

    const errors = [];
    if (!area || isNaN(area) || Number(area) < 100 || Number(area) > 100000)
      errors.push("Area must be between 100 and 100,000 sq ft.");
    if (!location || typeof location !== "string" || location.trim().length < 2)
      errors.push("Location must be valid.");
    if (!bedrooms || isNaN(bedrooms) || Number(bedrooms) < 1 || Number(bedrooms) > 10)
      errors.push("Bedrooms must be between 1 and 10.");

    if (errors.length > 0) return res.status(400).json({ errors });

    const result = predict({
      area: Number(area),
      location: location.trim(),
      bedrooms: Number(bedrooms),
    });

    const prediction = await Prediction.create({
      area: Number(area),
      location: location.trim(),
      bedrooms: Number(bedrooms),
      predictedPrice: result.predictedPrice,
      pricePerSqFt: result.pricePerSqFt,
      confidence: result.confidence,
    });

    res.status(200).json({
      success: true,
      data: { ...result, id: prediction._id, timestamp: prediction.createdAt },
    });
  } catch (err) {
    console.error("Prediction error:", err);
    res.status(500).json({ error: "Prediction failed." });
  }
});

module.exports = router;