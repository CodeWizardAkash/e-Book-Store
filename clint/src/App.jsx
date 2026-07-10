import React from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound'
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import {Route, Routes} from 'react-router-dom'
function App(){
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;