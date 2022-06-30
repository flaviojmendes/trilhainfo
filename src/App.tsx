import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RoadmapPage from "./pages/RoadmapPage";
import ReactGA from "react-ga";

function App() {
  
  ReactGA.initialize( 'G-GQDL3TBPEZ');
  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/roadmap/:name" element={<RoadmapPage />} />
    </Routes>
  );
}

export default App;
