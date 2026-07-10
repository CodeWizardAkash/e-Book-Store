import React, { useState, useEffect } from "react";
import Login from "./Login";

function Navbar() {
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
    <nav className="w-full shadow-md fixed top-0 left-0 right-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold">BookStore</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 font-medium">
            <li className="hover:text-primary  hover:font-bold cursor-pointer"><a href="/">Home</a></li>
            <li className="hover:text-primary hover:font-bold cursor-pointer"><a href="/books">Books</a></li>
            <li className="hover:text-primary hover:font-bold cursor-pointer"><a href="/course">Course</a></li>
            <li className="hover:text-primary hover:font-bold cursor-pointer"><a href="/contact ">Contact</a></li>
            <li className="hover:text-primary hover:font-bold cursor-pointer"><a href="/about">About</a></li>
          </ul>

          <div className=" flex  hover:bg-gray-100 rounded-md py-1">
            <img className="w-5 p-1" src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-line-icon.png" alt="" />
            <input
              type="text"
              placeholder="Search book"
              className="input input-bordered input-sm outline-none"
            />
          </div>
          

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button className="btn btn-primary btn-sm cursor-pointer hover:bg-emerald-500 hover:text-white w-15 py-1 rounded-md" onClick={()=>setOpenLogin(true)}>Login</button>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 font-medium">
            <li><a href="/">Home</a></li>
            <li><a href="/course">Course</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
          </ul>

          <div className="mt-4 flex gap-3">
            <button onClick={toggleTheme} className="btn btn-outline btn-sm">
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <button className="btn btn-primary btn-sm">Login</button>
          </div>
        </div>
      )}
    </nav>
    <Login open={openLogin} setOpen={setOpenLogin} />
    </>

  );
}

export default Navbar;