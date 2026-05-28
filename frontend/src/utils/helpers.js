/**
 * Formats a number into Indian currency format (₹ Cr / ₹ L / ₹)
 */
export function formatINR(amount) {
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
  } else if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(2)} L`;
  } else {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
}

export function formatPricePerSqFt(price) {
  return `₹${price.toLocaleString("en-IN")}/sq ft`;
}

export const DELHI_NCR_LOCATIONS = [
  // South Delhi
  "Defence Colony", "Vasant Kunj", "South Extension", "Greater Kailash",
  "Hauz Khas", "Safdarjung Enclave", "Green Park", "Malviya Nagar", "Lajpat Nagar",
  // Central
  "Connaught Place", "Karol Bagh", "Rajouri Garden", "Tilak Nagar",
  // West/North
  "Rohini", "Pitampura", "Janakpuri", "Dwarka", "Uttam Nagar",
  // Gurgaon
  "DLF Cyber City", "Golf Course Road", "Sohna Road", "MG Road Gurgaon",
  "Sector 56 Gurgaon", "New Gurgaon", "Manesar",
  // Noida
  "Sector 18 Noida", "Sector 62 Noida", "Sector 137 Noida", "Sector 150 Noida",
  "Expressway Noida", "Greater Noida West", "Greater Noida", "Noida Extension",
  // Faridabad / Ghaziabad
  "Faridabad", "Indirapuram", "Vaishali", "Raj Nagar Extension", "Ghaziabad",
];