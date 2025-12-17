import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import BookDetails from "./pages/BookDetails";
import FavoritesPage from "./pages/FavoritesPage";
import ReadingListPage from "./pages/ReadingListPage";
import BooksReadPage from "./pages/BooksReadPage";

import React from "react";
import Layout from "./components/common/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<HomePage />} />
        </Route>
        <Route path="/favorites" element={<Layout />}>
          <Route index={true} element={<FavoritesPage />} />
        </Route>
        <Route path="/reading-list" element={<Layout />}>
          <Route index={true} element={<ReadingListPage />} />
        </Route>
        <Route path="/books-read" element={<Layout />}>
          <Route index={true} element={<BooksReadPage />} />
        </Route>
        <Route path="/books/:id" element={<Layout />}>
          <Route index={true} element={<BookDetails />} />
        </Route>

        <Route path="*" element={<div>404 - Page Not Found!</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
