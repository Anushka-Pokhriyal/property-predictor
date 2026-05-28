const LOCATION_DATA = {
  "defence colony": { base: 28000, tier: "premium" },
  "vasant kunj":    { base: 22000, tier: "premium" },
  "greater kailash":{ base: 24000, tier: "premium" },
  "hauz khas":      { base: 23000, tier: "premium" },
  "lajpat nagar":   { base: 18000, tier: "high" },
  "karol bagh":     { base: 14000, tier: "mid" },
  "rohini":         { base: 8500,  tier: "affordable" },
  "dwarka":         { base: 7500,  tier: "affordable" },
  "uttam nagar":    { base: 6500,  tier: "affordable" },
  "golf course road":   { base: 16000, tier: "premium" },
  "sohna road":         { base: 9000,  tier: "mid" },
  "mg road gurgaon":    { base: 14000, tier: "high" },
  "new gurgaon":        { base: 8000,  tier: "affordable" },
  "sector 18 noida":    { base: 12000, tier: "high" },
  "sector 62 noida":    { base: 8500,  tier: "mid" },
  "greater noida west": { base: 5000,  tier: "affordable" },
  "noida extension":    { base: 4800,  tier: "affordable" },
  "indirapuram":        { base: 6000,  tier: "affordable" },
  "vaishali":           { base: 6500,  tier: "affordable" },
  "faridabad":          { base: 5000,  tier: "affordable" },
};

const BHK_MULTIPLIER = { 1: 0.85, 2: 1.0, 3: 1.08, 4: 1.15, 5: 1.20, 6: 1.22 };

function matchLocation(input) {
  const q = input.toLowerCase().trim();
  if (LOCATION_DATA[q]) return LOCATION_DATA[q];
  for (const [key, val] of Object.entries(LOCATION_DATA)) {
    if (q.includes(key) || key.includes(q)) return val;
  }
  if (/gurgaon|gurugram/.test(q)) return { base: 10000, tier: "mid" };
  if (/noida/.test(q))            return { base: 6000,  tier: "affordable" };
  if (/faridabad/.test(q))        return { base: 5000,  tier: "affordable" };
  if (/delhi/.test(q))            return { base: 10000, tier: "mid" };
  return { base: 8000, tier: "mid" };
}

function getConfidence(input) {
  const q = input.toLowerCase().trim();
  if (LOCATION_DATA[q]) return "High";
  for (const key of Object.keys(LOCATION_DATA)) {
    if (q.includes(key) || key.includes(q)) return "High";
  }
  if (/gurgaon|noida|delhi|faridabad/.test(q)) return "Medium";
  return "Low";
}

function predict({ area, location, bedrooms }) {
  const locData = matchLocation(location);
  const bhkMult = BHK_MULTIPLIER[Math.min(bedrooms, 6)] || 1.0;
  const pricePerSqFt = Math.round(locData.base * bhkMult);
  const variance = 1 + (Math.random() * 0.1 - 0.05);
  const predictedPrice = Math.round(area * pricePerSqFt * variance);
  return {
    predictedPrice,
    pricePerSqFt,
    confidence: getConfidence(location),
    breakdown: {
      locationTier: locData.tier,
      baseRatePerSqFt: locData.base,
      bhkMultiplier: bhkMult,
      area, bedrooms, location,
    },
  };
}

module.exports = { predict, LOCATION_DATA };