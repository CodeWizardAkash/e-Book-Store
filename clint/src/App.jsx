import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import { getProfile } from './services/auth.service';
import {Route, Routes} from 'react-router-dom'
function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  )

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div >Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar theme={theme} setTheme={setTheme} user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/books/:id' element={<BookDetails/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;