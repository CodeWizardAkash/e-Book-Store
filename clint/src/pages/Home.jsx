import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import PopularBooks from '../components/PopularBooks';
// import Freebook from '../components/Freebook';
function Home(){
  return (
    <>
      {/* <Navbar/> */}
      <Banner/>
      
      <PopularBooks/>
      
      <Footer />
    </>
  )
}

export default Home;