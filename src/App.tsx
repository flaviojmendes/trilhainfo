import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RoadmapPage from "./pages/RoadmapPage";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/roadmap/:name" element={<RoadmapPage />} />
    </Routes>
  );
}

export default App;
