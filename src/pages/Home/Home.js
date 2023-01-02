import React from 'react';
import Greet from './Greet/Greet';
import About from './About/About';
import Menu from './Menu/Menu';
import Blogs from './Blogs/Blogs';
import Contact from './Contact/Contact';
import Footer from '../../components/footer/Footer';
import './styles.css';

const Home = ({ setCart }) => {
  return (
    <div className="home-container">
      <Greet />
      {/* <About /> */}
      <Menu setCart={setCart} />
      <Blogs />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
};

export default Home;
