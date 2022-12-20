import React from 'react'
import { BsFacebook, BsInstagram } from 'react-icons/bs'
import { HiUserGroup } from 'react-icons/hi'
import logo from '../../assets/foodtown-ava.png'
import './styles.css'

const Footer = () => {
  const navItems = [
    {
      name: 'ABOUT US',
      id: '#about',
    },
    {
      name: 'MENU',
      id: '#menu',
    },
    {
      name: 'BLOGS',
      id: '#blogs',
    },
    {
      name: 'CONTACT',
      id: '#contact',
    },
  ]

  return (
    <div className="footer">
      <img src={logo} alt="footer-logo" className="footer-image" />
      <p className="footer-address">
        Address: Hanoi University of Science and Technology, 1 Dai Co Viet Road, Ha Noi, Viet Nam
      </p>
      <p className="footer-phone">Điện thoại: 038 966 9553 | 035 863 1412</p>
      <div className="footer-contact">
        <a href="https://www.facebook.com/foodtown2022" target="_blank">
          <BsFacebook size={36} cursor="pointer" />
        </a>
        <a href="https://www.facebook.com/groups/334875307765178" target="_blank">
          <HiUserGroup size={36} cursor="pointer" />
        </a>
        <a href="https://www.instagram.com/foodtown.project/" target="_blank">
          <BsInstagram size={36} cursor="pointer" />
        </a>
      </div>
      <div className="footer-nav">
        {navItems.map((item, i) => (
          <a key={i} href={item.id}>
            {item.name.toUpperCase()}
          </a>
        ))}
      </div>
      <div className="footer-copyright">&copy; FOOD TOWN 2022. ALL RIGHTS RESERVE</div>
    </div>
  )
}

export default Footer
