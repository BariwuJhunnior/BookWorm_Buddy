import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, Link } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex h-15 bg-gray-800 justify-center items-center text-white transition-all duration-150">
        <ul>
          <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <main className="h-[90vh]">
        {/* Where the child route components will be rendered */}
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white h-15 flex items-center justify-center">
        <p>Footer Content</p>
      </footer>
    </div>
  );
};

export default Layout;
