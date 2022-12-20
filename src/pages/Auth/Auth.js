import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './styles.css'
import { signup, login } from '../../actions/auth'
import { ADMIN } from '../../constants/role'

const Auth = () => {
  const [signupInfo, setSignupInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  const [mode, setMode] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleTypingSignupInfo = (e) => {
    const changeElement = e.target
    setSignupInfo((prev) => {
      return {
        ...prev,
        [changeElement.name]: changeElement.value,
      }
    })
  }

  const handleTypingLoginInfo = (e) => {
    const changeElement = e.target
    setLoginInfo((prev) => {
      return {
        ...prev,
        [changeElement.name]: changeElement.value,
      }
    })
  }

  const onLogin = () => {
    setMode(0)
  }

  const onSignUp = () => {
    setMode(1)
  }

  const onLoginAsAdmin = () => {
    localStorage.setItem('role', ADMIN)
    navigate('/admin/login')
  }

  const onSubmitLogin = (e) => {
    e.preventDefault()
    try {
      dispatch(login(loginInfo, false, navigate))
      // navigate("/");
    } catch (error) {
      console.log({ error })
    }
  }

  const onSubmitSignup = (e) => {
    e.preventDefault()
    if (signupInfo.password !== signupInfo.repeatPassword) return
    dispatch(signup(signupInfo, navigate))
    // navigate("/");
  }

  const displayForm = () => {
    switch (mode) {
      case 1:
        return (
          <div className="signup-form-container">
            <p className="auth-form-title">Welcome to FoodTown</p>
            <p>Sign up to eat with us</p>
            <div className="signup-form">
              <div className="signup-name">
                <input
                  type="text"
                  name="firstName"
                  value={signupInfo.firstName}
                  className="signup-firstname"
                  placeholder="Firstname..."
                  onChange={handleTypingSignupInfo}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={signupInfo.lastName}
                  className="signup-lastname"
                  placeholder="Lastname..."
                  onChange={handleTypingSignupInfo}
                  required
                />
              </div>
              <input
                type="text"
                name="phoneNumber"
                value={signupInfo.phoneNumber}
                placeholder="Phone number..."
                onChange={handleTypingSignupInfo}
                required
              />
              <input
                type="text"
                name="email"
                value={signupInfo.email}
                placeholder="Email..."
                onChange={handleTypingSignupInfo}
                required
              />
              <input
                type="password"
                name="password"
                value={signupInfo.password}
                placeholder="Password..."
                onChange={handleTypingSignupInfo}
                required
              />
              <input
                type="password"
                name="repeatPassword"
                value={signupInfo.repeatPassword}
                placeholder="Re-enter password..."
                onChange={handleTypingSignupInfo}
                required
              />
            </div>
            <button className="btn-transparent btn" onClick={onSubmitSignup}>
              Register
            </button>
            <p onClick={onLogin} className="auth-mode">
              I want to register
            </p>
          </div>
        )
      case 2:
      default:
        return (
          <form action="" className="login-form-container">
            <p className="auth-form-title">Welcome to FoodTown</p>
            <p>Login to eat with us</p>
            <div className="login-form">
              <input
                type="text"
                name="email"
                placeholder="Email..."
                onChange={handleTypingLoginInfo}
              />
              <input
                type="password"
                name="password"
                placeholder="Password..."
                onChange={handleTypingLoginInfo}
              />
            </div>
            <button className="btn-transparent btn" onClick={onSubmitLogin}>
              Login
            </button>
            <p onClick={onSignUp} className="auth-mode">
              Do not have account yet?
            </p>
            <p onClick={onLoginAsAdmin} className="auth-mode">
              Login as administrators
            </p>
          </form>
        )
    }
  }

  return <div className="auth-container container">{displayForm()}</div>
}

export default Auth
