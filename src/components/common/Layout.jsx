import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, Link } from "react-router";
import {
  FaHome,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMailBulk,
} from "react-icons/fa";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-gray-900 via-gray-700 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-[-1000] pointer-events-none">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Floating Elements In The Background */}
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
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center justify-center p-0 bg-transparent">
              <h1 className="text-1xl md:text-2xl font-extrabold tracking-tighter text-slate-400 flex items-center">
                <span className="drop-shadow-sm">BookWorm</span>

                <span className="relative ml-2 text-blue-400">
                  Buddy
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-slate-400 rounded-full -z-10"></span>
                </span>

                <span className="text-slate-400 ml-0.5">.</span>
              </h1>
            </div>

            {/* Navigation Links */}
            <ul className="flex gap-5">
              <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
                <Link to="/favorites">Favorites</Link>
              </li>
              <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
                <Link to="/reading-list">Reading List</Link>
              </li>
              <li className="transition-all duration-150 hover:opacity-80 active:opacity-100">
                <Link to="/books-read">Books Read</Link>
              </li>
              <li className="transition-all duration-150 hover:opacity-80 active:opacity-100 ml-5">
                <Link to="/">
                  <FaHome size={30} />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="h-full">
        {/* Where the child route components will be rendered */}
        <Outlet />
      </main>

      <footer className="p-4 mt-auto  bg-gray-800/20 backdrop-blur-md border-b border-white/10 text-white transition-all duration-150 w-full shadow-lg flex flex-col justify-center items-center">
        {/* Logo */}
        <div className="flex items-center justify-center p-1 bg-transparent">
          <h1 className="text-1xl md:text-2xl font-extrabold tracking-tighter text-slate-400 flex items-center">
            <span className="drop-shadow-sm">BookWorm</span>

            <span className="relative ml-2 text-blue-400 shadow">
              Buddy
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-slate-400 rounded-full -z-10"></span>
            </span>

            <span className="text-slate-400 ml-0.5">.</span>
          </h1>
        </div>
        <div className="container mx-auto text-center text-bold">
          &copy; 2026 BookWorm Buddy
        </div>

        {/* Contact Us */}
        <div className="mt-5 text-2xl mb-3 font-extrabold">Contact Us</div>
        <div className="flex gap-5">
          <h3>
            <FaFacebook
              size={20}
              className="tranform transition duration-300 hover:scale-170 cursor-pointer"
            />
          </h3>
          <h3>
            <FaInstagram
              size={20}
              className="tranform transition duration-300 hover:scale-170 cursor-pointer"
            />
          </h3>
          <h3>
            <FaTwitter
              size={20}
              className="tranform transition duration-300 hover:scale-170 cursor-pointer"
            />
          </h3>
          <h3>
            <FaMailBulk
              size={20}
              className="tranform transition duration-300 hover:scale-170 cursor-pointer"
            />
          </h3>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
