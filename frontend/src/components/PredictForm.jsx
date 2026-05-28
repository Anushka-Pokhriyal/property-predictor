import React, { useState } from "react";
import { predictPrice } from "../utils/api";
import { DELHI_NCR_LOCATIONS } from "../utils/helpers";
import toast from "react-hot-toast";

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function PredictForm({ onResult }) {
  const [form, setForm] = useState({ area: "", location: "", bedrooms: 2 });
  const [loading, setLoading] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = DELHI_NCR_LOCATIONS.filter((l) =>
    l.toLowerCase().includes(locationQuery.toLowerCase())
  ).slice(0, 6);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.area || !form.location) {
      toast.error("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await predictPrice(form);
      onResult(data.data);
      toast.success("Prediction ready!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="predict-form">
      {/* Area */}
      <div className="field-group">
        <label htmlFor="area">
          <span className="label-icon">📐</span>
          Area (sq ft)
        </label>
        <input
          id="area"
          type="number"
          placeholder="e.g. 1200"
          value={form.area}
          min={100}
          max={100000}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          required
        />
      </div>

      {/* Location with autocomplete */}
      <div className="field-group" style={{ position: "relative" }}>
        <label htmlFor="location">
          <span className="label-icon">📍</span>
          Location
        </label>
        <input
          id="location"
          type="text"
          placeholder="e.g. Dwarka, Sector 18 Noida..."
          value={locationQuery}
          autoComplete="off"
          onChange={(e) => {
            setLocationQuery(e.target.value);
            setForm({ ...form, location: e.target.value });
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          required
        />
        {showSuggestions && filtered.length > 0 && (
          <ul className="suggestions">
            {filtered.map((loc) => (
              <li
                key={loc}
                onMouseDown={() => {
                  setLocationQuery(loc);
                  setForm({ ...form, location: loc });
                  setShowSuggestions(false);
                }}
              >
                {loc}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bedrooms */}
      <div className="field-group">
        <label>
          <span className="label-icon">🛏</span>
          Bedrooms (BHK)
        </label>
        <div className="bhk-grid">
          {BEDROOM_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              className={`bhk-btn ${form.bedrooms === n ? "active" : ""}`}
              onClick={() => setForm({ ...form, bedrooms: n })}
            >
              {n} BHK
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? (
          <span className="spinner-wrap">
            <span className="spinner" /> Predicting…
          </span>
        ) : (
          "→ Predict Price"
        )}
      </button>
    </form>
  );
}