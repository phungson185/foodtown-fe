import React from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { USER } from '../../../constants/role'
import { useState } from 'react'
import { login } from '../../../actions/auth'
import { useDispatch } from 'react-redux'

const Login = () => {

    const [loginInfo, updateLoginInfo] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLoginAsUser = () => {
        localStorage.setItem('role', USER);
        navigate('/auth');
    }

    const onUpdateLoginInfo = (e) => {
        updateLoginInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitLogin = () => {
        dispatch(login(loginInfo, true, navigate));
    }

    return (
        <Box className='login__admin-container'>
            <TextField id="outlined-basic" label="Username" variant="outlined" name='email' value={loginInfo.email} onChange={onUpdateLoginInfo} fullWidth/>
            <TextField id="outlined-basic" label="Password" variant="outlined" name='password' type="password" value={loginInfo.password} onChange={onUpdateLoginInfo} fullWidth/>
            <Box className='login__admin-functions'>
                <Typography onClick={onLoginAsUser} className='login__admin-function'>Đăng nhập như người dùng</Typography>
                <Typography className='login__admin-function'>Quên mật khẩu</Typography>
            </Box>
            <Button variant="outlined" onClick={onSubmitLogin} fullWidth>Đăng Nhập</Button>
        </Box>
    )
}

export default Login