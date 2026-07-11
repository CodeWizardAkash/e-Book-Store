import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import {Route, Routes} from 'react-router-dom'
function App(){
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  )

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;