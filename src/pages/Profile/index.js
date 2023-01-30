import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import "./styles.css";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/auth";
import { Avatar, Button } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const [address, setAddress] = useState({});
  const [addressAll, setAddressAll] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const [addressEdit, setAddressEdit] = useState(null);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: [],
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address || [],
        avatar: user.avatar,
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setAddressAll(user.address?.map((address) => JSON.parse(address)) || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function handleOpenModal() {
    setIsShowModal(true);
  }

  function handleCloseModal() {
    setIsShowModal(false);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  useEffect(() => {
    setProfile((prev) => {
      return {
        ...prev,
        address: addressAll,
      };
    });
  }, [addressAll]);

  function handleAddAddress() {
    if (!address?.label || !address?.position) return;
    setAddressAll((prev) => {
      return [...prev, { ...address }];
    });
    setAddress({});
    setIsShowModal(false);
  }

  function handleOnChangeAddress(e) {
    setAddress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleOnChangeAddressEdit(e) {
    setAddressEdit((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  // click button edit address
  function handleEditAddress(index) {
    setAddressEdit({ ...addressAll[index], index });
    setIsShowModalEdit(true);
  }

  function handleUpdateAddress() {
    if (!addressEdit?.label || !addressEdit?.position) return;
    addressAll[addressEdit.index] = addressEdit;
    setAddressAll([...addressAll]);
    setAddressEdit(null);
    setIsShowModalEdit(false);
  }

  function handleDeleteAddress(index) {
    addressAll.splice(index, 1);
    console.log(addressAll);
    setAddressAll([...addressAll]);
  }

  return (
    <div className="profile-container">
      <div className="profile-gradient"></div>
      <div className="profile-content">
        <Avatar
          sx={{ width: 240, height: 240, margin: "-50px 0 50px 0" }}
          src={user?.avatar}
        ></Avatar>
        <div className="form-wrapper">
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={9}>
              <Button variant="contained" component="label">
                Tải ảnh
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
            {/* <Grid item xs={9}>
              <Paper>
                <TextField
                  name="phoneNumber"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  required
                  fullWidth
                  label="Số điện thoại"
                  value={profile.phoneNumber}
                  onChange={handleOnChangeProfile}
                />
              </Paper>
            </Grid> */}
            {addressAll?.map((address, index) => (
              <Grid
                container
                item
                xs={12}
                rowSpacing={3}
                columnSpacing={2}
                key={index}
                alignItems="center"
              >
                <Grid item xs={1.5}>
                  <Paper>
                    <TextField
                      name="label"
                      fullWidth
                      label="Tên địa chỉ"
                      value={address.label}
                      disabled
                    />
                  </Paper>
                </Grid>
                <Grid item xs={5}>
                  <Paper>
                    <TextField
                      name="position"
                      fullWidth
                      label="Địa chỉ"
                      disabled
                      value={address.position}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper>
                    <TextField
                      name="phoneNumber"
                      fullWidth
                      label="Số điện thoại"
                      placeholder={profile.phoneNumber}
                      disabled
                      value={address.phoneNumber}
                    />
                  </Paper>
                </Grid>
                <Grid item >
                  <EditIcon
                    className="btn-edit-address"
                    onClick={() => handleEditAddress(index)}
                  />
                </Grid>
                <Grid item>
                  <HighlightOffOutlinedIcon
                    className="btn-delele-address"
                    onClick={() => handleDeleteAddress(index)}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={9}>
              <button className="btn btn-add-address" onClick={handleOpenModal}>
                <AddCircleSharpIcon size="medium" />
                Thêm địa chỉ mới
              </button>
            </Grid>
            <Grid item xs={8}>
              <Paper styles={{ boxShadow: "unset" }}></Paper>
            </Grid>
          </Grid>
          <Button
            size="large"
            variant="contained"
            onClick={handleUpdateProfile}
          >
            Cập nhật
          </Button>
          <Modal open={isShowModal} onClose={handleCloseModal}>
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                style={{ marginBottom: "20px" }}
              >
                Thêm địa chỉ mới
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12}>
                  <Paper>
                    <TextField
                      name="label"
                      onChange={handleOnChangeAddress}
                      required
                      fullWidth
                      label="Tên địa chỉ"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <TextField
                      name="position"
                      onChange={handleOnChangeAddress}
                      required
                      fullWidth
                      label="Địa chỉ chi tiết"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <TextField
                      name="phoneNumber"
                      onChange={handleOnChangeAddress}
                      required
                      fullWidth
                      label="Số điện thoại"
                      placeholder={profile.phoneNumber}
                    />
                  </Paper>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  columnSpacing={1}
                  justifyContent="flex-end"
                >
                  <Grid item justifyContent="flex-end">
                    <Button
                      size="large"
                      onClick={handleCloseModal}
                      style={{ marginRight: "10px" }}
                    >
                      Hủy
                    </Button>
                  </Grid>
                  <Grid item justifyContent="flex-end">
                    <Button
                      size="large"
                      variant="contained"
                      onClick={handleAddAddress}
                    >
                      Thêm
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Modal>
          <Modal
            open={isShowModalEdit}
            onClose={() => setIsShowModalEdit(false)}
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                style={{ marginBottom: "20px" }}
              >
                Sửa địa chỉ
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item xs={12}>
                  <Paper>
                    <TextField
                      name="label"
                      onChange={handleOnChangeAddressEdit}
                      required
                      fullWidth
                      value={addressEdit?.label}
                      label="Tên địa chỉ"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <TextField
                      name="position"
                      onChange={handleOnChangeAddressEdit}
                      required
                      fullWidth
                      value={addressEdit?.position}
                      label="Địa chỉ chi tiết"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <TextField
                      name="phoneNumber"
                      onChange={handleOnChangeAddressEdit}
                      required
                      fullWidth
                      value={addressEdit?.phoneNumber}
                      label="Số điện thoại"
                      placeholder={profile.phoneNumber}
                    />
                  </Paper>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  columnSpacing={1}
                  justifyContent="flex-end"
                >
                  <Grid item justifyContent="flex-end">
                    <Button
                      size="large"
                      onClick={() => setIsShowModalEdit(false)}
                      style={{ marginRight: "10px" }}
                    >
                      Hủy
                    </Button>
                  </Grid>
                  <Grid item justifyContent="flex-end">
                    <Button
                      size="large"
                      variant="contained"
                      onClick={handleUpdateAddress}
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
