import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './styles.css'
import { signup, login } from '../../actions/auth'
import { ADMIN } from '../../constants/role'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isEmpty } from 'lodash'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Auth = () => {
  const [mode, setMode] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const signupInitialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    repeatPassword: '',
  }
  const signupValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Vui lòng nhập tên"),
    lastName: Yup.string().required("Vui lòng nhập họ"),
    phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại"),
    email: Yup.string().email('Vui lòng nhập một email hợp lệ').required("Vui lòng nhập email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
    repeatPassword: Yup.string()
      .trim()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([Yup.ref('password')], "Mật khẩu không khớp"),
  })
  const onSubmitSignup = (values) => {
    try {
      dispatch(signup(values, navigate))
      // navigate("/");
    } catch (error) {
      console.log(error)
    }
  }


  const loginInitialValues = {
    email: '',
    password: '',
  }
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Vui lòng nhập một email hợp lệ').required("Vui lòng nhập email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu")
  })

  const onSubmitLogin = (values, props) => {
    try {
      dispatch(login(values, false, navigate))
      // navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  const displayForm = () => {
    switch (mode) {
      case 1:
        return (
          <div className="signup-form-container">
            <p className="auth-form-title">Chào mừng tới FoodTown</p>
            <p>Hãy đăng ký để cùng ăn với chúng tôi</p>
            <Formik initialValues={signupInitialValues} onSubmit={onSubmitSignup} validationSchema={signupValidationSchema}>
              {({ errors, touched }) => (
                <Form className="signup-form">
                  {/* <div className="signup-name"> */}
                    <Field
                      type="text"
                      name="firstName"
                      className="signup-firstname"
                      placeholder="Tên ..."
                    />
                    {errors.firstName && touched.firstName ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'start' }}>{errors.firstName}</span> : null}
                    <Field
                      type="text"
                      name="lastName"
                      className="signup-lastname"
                      placeholder="Họ ..."
                    />
                    {errors.lastName && touched.lastName ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'start' }}>{errors.lastName}</span> : null}
                  {/* </div> */}
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="Số điện thoại..."
                  />
                  {errors.phoneNumber && touched.phoneNumber ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'start' }}>{errors.phoneNumber}</span> : null}
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email đăng nhập..."
                  />
                  {errors.email && touched.email ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'start' }}>{errors.email}</span> : null}
                  <Field
                    type="password"
                    name="password"
                    placeholder="Mật khẩu..."
                  />
                  {errors.password && touched.password ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'start' }}>{errors.password}</span> : null}
                  <Field
                    type="password"
                    name="repeatPassword"
                    placeholder="Nhắc lại mật khẩu..."
                  />
                  {errors.repeatPassword && touched.repeatPassword ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'start' }}>{errors.repeatPassword}</span> : null}
                  <button type='submit' className="btn-transparent btn" >
                    Đăng ký
                  </button>
                </Form>
              )}
            </Formik>
            <p onClick={onLogin} className="auth-mode">
              Tôi muốn đăng nhập
            </p>
          </div>
        )
      case 2:
      default:
        return (
          <div action="" className="login-form-container">
            <p className="auth-form-title">Chào mừng tới FoodTown</p>
            <p>Hãy đăng nhập để tận hưởng cùng chúng tôi</p>
            <Formik initialValues={loginInitialValues} onSubmit={onSubmitLogin} validationSchema={loginValidationSchema}>
              {({ errors, touched }) => (
                <Form className="login-form">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email..."
                  />
                  {errors.email && touched.email ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'start' }}>{errors.email}</span> : null}
                  <Field
                    type="password"
                    name="password"
                    placeholder="Mật khẩu..."
                  />
                  {errors.password && touched.password ? <span style={{ color: 'red', fontSize: '12px', textAlign: 'start' }}>{errors.password}</span> : null}
                  <button type='submit' className="btn-transparent btn" >
                    Đăng nhập
                  </button>

                </Form>
              )}
            </Formik>
            <p onClick={onSignUp} className="auth-mode">
              Bạn chưa có tài khoản?
            </p>
            <p onClick={onLoginAsAdmin} className="auth-mode">
              Đăng nhập như quản trị viên
            </p>
          </div >
        )
    }
  }

  return <div className="auth-container container">{displayForm()}</div>
}

export default Auth
