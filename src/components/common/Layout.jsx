import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, Link } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-white">
      <header className="fixed top-0 left-0 w-full z-10 shadow-md">
        <nav className="container mx-auto p-4  bg-gray-800 text-white transition-all duration-150 w-full">
          <ul className="flex gap-5 justify-end-safe">
            <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
              <Link to="/">Home</Link>
            </li>
            <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
              <Link to="/favorites">Favorites</Link>
            </li>
            <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
              <Link to="#">Reading List</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="h-full">
        {/* Where the child route components will be rendered */}
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          &copy; 2025 BookWorm Buddy
        </div>
      </footer>
    </div>
  );
};

export default Layout;
