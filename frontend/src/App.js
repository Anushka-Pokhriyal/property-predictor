import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">🏙</span>
        <span className="brand-name">PropPredict <span className="brand-ncr">NCR</span></span>
      </div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Predict
        </NavLink>
        <a
          href="https://github.com/your-username/property-predictor"
          target="_blank"
          rel="noreferrer"
          className="nav-link"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Built with React + Node.js + MongoDB · Delhi NCR market data 2024</p>
      <p className="footer-note">For informational purposes only. Consult a licensed agent for formal valuations.</p>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--surface)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          },
        }}
      />
      <Navbar />
      <main className="main-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}