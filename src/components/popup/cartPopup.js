import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./cartPopup.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const CartPopup = ({ onSuccess, onClose }) => {
  const user = useSelector((state) => state.auth.authData);

  const addressAll = user.address?.map((address) => JSON.parse(address));

  const [newInfo, setNewInfo] = useState({
    phoneNumber: addressAll?.[0]?.phoneNumber,
    // value: addressAll?.[0]?.label + " - " + addressAll?.[0]?.position,
    // address: addressAll?.[0]?.label,
    // addressDetail: addressAll?.[0]?.position,
    addressLabel: addressAll?.[0]?.label,
    addressDetail: addressAll?.[0]?.position,
  });

  return (
    <>
      <DialogTitle fontWeight={600}>Xác nhận thông tin khách hàng</DialogTitle>

      <DialogContent>
        <div className="w-full">
          <div>
            Nhập vào thông tin giao hàng hoặc chọn
            {addressAll && addressAll.length > 0 ? (
              <Select
                value={newInfo.address}
                sx={{ marginLeft: "10px" }}
                value={newInfo.addressLabel}
                onChange={(e) =>
                  setNewInfo({
                    ...newInfo,
                    addressLabel: e.target.value,
                    addressDetail: addressAll.find(
                      (address) => address.label === e.target.value
                    ).position,
                    phoneNumber: addressAll.find(
                      (address) => address.label === e.target.value
                    ).phoneNumber,
                    // value:
                    //   e.target.value +
                    //   " - " +
                    //   addressAll.find(
                    //     (address) => address.label === e.target.value
                    //   ).position,
                  })
                }
              >
                {addressAll?.map((address, index) => (
                  <MenuItem key={index} value={address.label}>
                    {address.label}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <>
                Bạn chưa có thông tin giao hàng, vui lòng cập nhật để có thể đặt
                hàng. Cập nhật ngay <Link to="/profile">thông tin cá nhân</Link>
              </>
            )}
          </div>
        </div>

        <Grid container spacing={2} sx={{marginTop: '20px'}}>
          <Grid item xs={7}>
            <TextField
              type="text"
              fullWidth
              label="Địa chỉ"
              defaultValue={newInfo.addressDetail}
              value={newInfo.addressDetail}
              name="addressDetail"
              placeholder="Địa chỉ"
              onChange={(e) =>
                setNewInfo({ ...newInfo, addressDetail: e.target.value })
              }
              required
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              type="text"
              label="Số điện thoại"
              // defaultValue={newInfo.phoneNumber}
              value={newInfo.phoneNumber}
              name="phoneNumber"
              placeholder="Số điện thoại"
              onChange={(e) =>
                setNewInfo({ ...newInfo, phoneNumber: e.target.value })
              }
              required
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="contained" onClick={() => onSuccess(newInfo)}>
          Xác nhận
        </Button>
      </DialogActions>
    </>
  );
};

export default CartPopup;
