import React from 'react';
import acura_0 from '../assets/acura_0.png';
import acura_1 from '../assets/acura_1.png';
import acura_2 from '../assets/acura_2.png';
import ferrari from '../assets/ferrari_spider_488_0.png';
import nissan from '../assets/nissan_gtr_0.png';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';


const Home = () => {
    const images = [
      acura_0,
      acura_1,
      acura_2,
      ferrari,
      nissan,
    ];

    return (
        <div>
              <Navbar/>
              <Hero/>
              <Footer/>
        </div>
  );
};

export default Home;
