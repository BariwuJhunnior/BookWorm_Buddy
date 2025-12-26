import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, Link } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-gray-900 via-gray-700 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-28 h-28 bg-pink-500/10 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>
      <header className="fixed top-0 left-0 w-full z-1000 m-auto">
        <nav className="px-4 py-4 bg-gray-800/20 backdrop-blur-md border-b border-white/10 text-white transition-all duration-150 w-full shadow-lg">
          <ul className="flex gap-5 justify-end-safe">
            <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
              <Link to="/">Home</Link>
            </li>
            <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
              <Link to="/favorites">Favorites</Link>
            </li>
            <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
              <Link to="/reading-list">Reading List</Link>
            </li>
            <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
              <Link to="/books-read">Books Read</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="h-full">
        {/* Where the child route components will be rendered */}
        <Outlet />
      </main>

      <footer className="p-4 mt-auto  bg-gray-800/20 backdrop-blur-md border-b border-white/10 text-white transition-all duration-150 w-full shadow-lg">
        <div className="container mx-auto text-center">
          &copy; 2025 BookWorm Buddy
        </div>
      </footer>
    </div>
  );
};

export default Layout;
