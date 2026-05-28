import React, { useState } from "react";
import PredictForm from "../components/PredictForm";
import ResultCard from "../components/ResultCard";
import History from "../components/History";

export default function Home() {
  const [result, setResult] = useState(null);
  const [historyKey, setHistoryKey] = useState(0);

  const handleResult = (data) => {
    setResult(data);
    setHistoryKey((k) => k + 1); // re-fetch history
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-layout">
      {/* Hero */}
      <section className="hero">
        <div className="hero-tag">🏙 Delhi NCR Real Estate Intelligence</div>
        <h1 className="hero-title">
          Know Your Property's<br />
          <span className="hero-accent">True Market Value</span>
        </h1>
        <p className="hero-sub">
          AI-powered price prediction for Delhi, Gurgaon, Noida &amp; more.
          Enter your property details and get an instant estimate.
        </p>
      </section>

      {/* Main card */}
      <div className="main-card">
        <div className="form-col">
          <h2 className="card-title">Get Instant Estimate</h2>
          <PredictForm onResult={handleResult} />
        </div>
        <div className="result-col">
          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="placeholder-result">
              <div className="placeholder-icon">🏠</div>
              <p>Your predicted price will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <History key={historyKey} />
    </div>
  );
}