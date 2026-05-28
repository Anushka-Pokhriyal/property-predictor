import React from "react";
import { formatINR, formatPricePerSqFt } from "../utils/helpers";

const CONFIDENCE_COLOR = {
  High: "#22c55e",
  Medium: "#f59e0b",
  Low: "#ef4444",
};

const TIER_LABEL = {
  premium: "Premium Zone 🏆",
  high: "High-Value Zone ⭐",
  mid: "Mid-Range Zone 🏠",
  affordable: "Affordable Zone 💚",
};

export default function ResultCard({ result }) {
  if (!result) return null;

  const { predictedPrice, pricePerSqFt, confidence, breakdown } = result;

  // Price range ±10%
  const low = Math.round(predictedPrice * 0.9);
  const high = Math.round(predictedPrice * 1.1);

  return (
    <div className="result-card">
      <div className="result-header">
        <span className="result-label">Estimated Market Value</span>
        <span
          className="confidence-badge"
          style={{ background: CONFIDENCE_COLOR[confidence] + "22", color: CONFIDENCE_COLOR[confidence] }}
        >
          ● {confidence} Confidence
        </span>
      </div>

      <div className="result-price">{formatINR(predictedPrice)}</div>

      <div className="result-range">
        Price range: {formatINR(low)} – {formatINR(high)}
      </div>

      <div className="result-meta-grid">
        <div className="meta-card">
          <span className="meta-label">Rate</span>
          <span className="meta-value">{formatPricePerSqFt(pricePerSqFt)}</span>
        </div>
        <div className="meta-card">
          <span className="meta-label">Area</span>
          <span className="meta-value">{breakdown.area.toLocaleString()} sq ft</span>
        </div>
        <div className="meta-card">
          <span className="meta-label">BHK</span>
          <span className="meta-value">{breakdown.bedrooms} Bedroom</span>
        </div>
        <div className="meta-card">
          <span className="meta-label">Zone</span>
          <span className="meta-value">{TIER_LABEL[breakdown.locationTier] || breakdown.locationTier}</span>
        </div>
      </div>

      <p className="result-disclaimer">
        * This is an AI estimate based on Delhi NCR market data. Actual prices may vary
        based on floor, amenities, and current market conditions.
      </p>
    </div>
  );
}