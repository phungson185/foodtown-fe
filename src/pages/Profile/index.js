import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import './styles.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/auth';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: null,
    avatar: null,
  });

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address || null,
        avatar: user.avatar,
      });
    }
  }, [user]);

  const handleOnChangeProfile = (e) => {
    setProfile((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUpdateProfile = () => {
    dispatch(updateUser(profile));
  };

  const onUploadTAvatar = (e) => {
    setProfile((prev) => {
      return {
        ...prev,
        avatar: e.target.files[0],
      };
    });
  };

  console.log(profile.avatar);

  return (
    <div className="profile-container">
      <div className="profile-gradient"></div>
      <div className="profile-content">
        <img
          className="profile-avatar"
          alt="avatar"
          src={profile.avatar ? URL.createObjectURL(profile.avatar) : 'https://i.imgur.com/6VBx3io.png'}
        />
        <div className="form-wrapper">
          <Grid container rowSpacing={3} columnSpacing={2}>
            {/* <Grid item xs={9}>
              <Button variant="contained" component="label">
                Upload avatar
                <input type="file" hidden onChange={onUploadTAvatar} />
              </Button>
            </Grid> */}
            <Grid item xs={4.5}>
              <Paper>
                <TextField
                  name="firstName"
                  onChange={handleOnChangeProfile}
                  required
                  fullWidth
                  label="First name"
                  value={profile.firstName}
                  disabled
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
                  label="Last name"
                  value={profile.lastName}
                  disabled
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
                  label="Phone number"
                  value={profile.phoneNumber}
                  onChange={handleOnChangeProfile}
                  disabled
                />
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper>
                <TextField
                  name="address"
                  fullWidth
                  label="Address"
                  value={profile.address}
                  onChange={handleOnChangeProfile}
                  disabled
                />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper styles={{ boxShadow: 'unset' }}></Paper>
            </Grid>
          </Grid>
          {/* <Button size="large" variant="contained" onClick={handleUpdateProfile}>
            Update
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
