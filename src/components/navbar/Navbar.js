import React from 'react'
import { logout } from '../../actions/auth'
import { useNavigate } from 'react-router-dom'
import { BsClockHistory } from 'react-icons/bs'
import { MdOutlineAccountCircle } from 'react-icons/md'
import logo from '../../assets/foodtown-ava.png'
import './styles.css'
import { useDispatch } from 'react-redux'
import { ADMIN } from '../../constants/role'

const Navbar = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSignIn = () => {
    navigate(`${localStorage.getItem('role') === ADMIN ? '/admin/login' : '/auth'}`)
  }

  const onLogout = () => {
    dispatch(logout())
  }

  const onViewOrders = () => {
    navigate('/order')
  }

  const navItems = [
    {
      name: 'Chúng tôi',
      id: '#about',
    },
    {
      name: 'Thực đơn',
      id: '#menu',
    },
    {
      name: 'Bài viết',
      id: '#blogs',
    },
    {
      name: 'Liên hệ',
      id: '#contact',
    },
  ]

  return (
    <div className="navbar-container">
      <div className="navbar-left-container">
        <a href="" className="navbar-home navbar-item" onClick={() => navigate('/')}>
          <img src={logo} alt="navbar-logo" className="navbar-logo" />
          <p className="navbar-name">Food Town</p>
        </a>
        {navItems.map((item, i) => (
          <a href={item.id} key={i} className="navbar-item">
            {item.name.toUpperCase()}
          </a>
        ))}
      </div>
      <div className="navbar-right-container">
        {user ? (
          <>
            <BsClockHistory className="navbar-cart" size={24} onClick={onViewOrders} />
            <div className="dropdown">
              <MdOutlineAccountCircle className="navbar-cart" size={26} />
              <div className="dropdown-content">
                <p onClick={onLogout}>ĐĂNG XUẤT</p>
              </div>
            </div>
          </>
        ) : (
          <p className="navbar-item" onClick={onSignIn}>
            ĐĂNG NHẬP
          </p>
        )}
      </div>
    </div>
  )
}

export default Navbar
