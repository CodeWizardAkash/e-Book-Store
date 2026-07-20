import React, { useState, useEffect } from "react";
import Login from "./Login";
import { logout } from "../services/auth.service.js";
import { Link } from "react-router-dom";
import { getProfile } from "../services/auth.service.js";

function Navbar({theme, setTheme, user, setUser}) {
  const [open, setOpen] = useState(false);
  // const [user, setUser] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  // const [profile, setProfile] = useState(null);
  
  // useEffect(()=>{
  //   const fetchProfile = async ()=>{
  //     try{
  //       const data = await getProfile();
  //       setProfile(data.user);
  //     }catch(error){
  //       setProfile(null);
  //     }
  //   }
  //   fetchProfile();
  // },[]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
    <nav className="w-full shadow-md fixed top-0 left-0 right-0 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold" href="/">BookStore</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 font-medium">
            <li className="hover:text-primary  hover:font-bold cursor-pointer"><a href="/">Home</a></li>
            <li className="hover:text-primary hover:font-bold cursor-pointer"><a href="/books">Books</a></li>
            {/* <li className="hover:text-primary hover:font-bold cursor-pointer"><a href="/course">Course</a></li> */}
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
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle ">
            {theme === "light" ? "🌙" : "☀️"}
          </button>


          {!user?(
            <button 
              className="btn btn-primary btn-sm cursor-pointer hover:bg-emerald-500 hover:text-white w-15 py-1 rounded-md"
              onClick={()=>setOpenLogin(true)}
              >
                Login
            </button>
          ):(            
            <Link className="relative" to={'/profile'}>
                {/* Avatar */}
                <img
                  src={user?.avatar || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer border"
                />
            </Link>        
          )}             

        </div>


       {/* Mobile Button */}   
        <div className="flex gap-5 md:hidden">
          {!user?(
            <button 
              className="btn btn-primary btn-sm cursor-pointer hover:bg-emerald-500 hover:text-white w-15 py-1 rounded-md"
              onClick={()=>setOpenLogin(true)}
              >
                Login
            </button>
          ):(            
            <Link className="relative" to={'/profile'}>
                {/* Avatar */}
                <img
                  src={user?.avatar || "/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer border"
                />
            </Link>        
          )} 
          
          <button
            className=" text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 bg-base-200">
          <ul className="flex flex-col gap-4 font-medium">
            <li><a href="/">Home</a></li>
            <li><a href="/books">Books</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/about">About</a></li>
          </ul>

          
          <button onClick={toggleTheme} className="mt-2 w-10 h-10 bg-base-100 rounded-full ">
            {theme === "light" ? "🌙" : "☀️"}
           </button>
        </div>
      )}
    </nav>
    <Login open={openLogin} setOpen={setOpenLogin} setUser={setUser} />
    </>

  );
}

export default Navbar;