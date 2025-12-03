import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./components/HomePage";

import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
