import React from 'react'
import Greet from './Greet/Greet'
import About from './About/About'
import Menu from './Menu/Menu'
import Blogs from './Blogs/Blogs'
import Contact from './Contact/Contact'
import Footer from '../../components/footer/Footer'
import './styles.css'

const Home = () => {
  return (
    <div className="home-container">
      <Greet />
      {/* <About /> */}
      {/* <Menu /> */}
      {/* <Blogs /> */}
      {/* <Contact /> */}
      <Footer />
    </div>
  )
}

export default Home
