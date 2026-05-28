const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    area:           { type: Number, required: true },
    location:       { type: String, required: true, trim: true },
    bedrooms:       { type: Number, required: true },
    predictedPrice: { type: Number, required: true },
    pricePerSqFt:   { type: Number, required: true },
    confidence:     { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);