import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import './styles.css'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../actions/auth'
import { Avatar, Button } from '@mui/material'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.authData)

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    avatar: '',
  })

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        avatar: user.avatar,
      })
    }
  }, [user])

  const handleOnChangeProfile = (e) => {
    setProfile((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleUpdateProfile = () => {
    dispatch(updateUser(profile))
  }

  const onUploadTAvatar = (e) => {
    setProfile((prev) => {
      return {
        ...prev,
        avatar: e.target.files[0],
      }
    })
  }

  return (
    <div className="profile-container">
      <div className="profile-gradient"></div>
      <div className="profile-content">
        <Avatar
          sx={{ width: 240, height: 240, margin: '-50px 0 50px 0' }}
          src={user?.avatar}
        ></Avatar>
        <div className="form-wrapper">
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={9}>
              <Button variant="contained" component="label">
                Upload avatar
                <input type="file" hidden onChange={onUploadTAvatar} />
              </Button>
            </Grid>
            <Grid item xs={4.5}>
              <Paper>
                <TextField
                  name="firstName"
                  onChange={handleOnChangeProfile}
                  required
                  fullWidth
                  label="Tên"
                  value={profile.firstName}
                />
              </Paper>
            </Grid>
            <Grid item xs={4.5}>
              <Paper>
                <TextField
                  name="lastName"
                  onChange={handleOnChangeProfile}
                  required
                  fullWidth
                  label="Họ"
                  value={profile.lastName}
                />
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper>
                <TextField
                  name="phoneNumber"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  required
                  fullWidth
                  label="Số điện thoại"
                  value={profile.phoneNumber}
                  onChange={handleOnChangeProfile}
                />
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper>
                <TextField
                  name="address"
                  fullWidth
                  label="Địa chỉ"
                  value={profile.address}
                  onChange={handleOnChangeProfile}
                />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper styles={{ boxShadow: 'unset' }}></Paper>
            </Grid>
          </Grid>
          <Button size="large" variant="contained" onClick={handleUpdateProfile}>
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
