import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './cartPopup.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const CartPopup = ({ onSuccess, onClose }) => {
  // const [isNew, setIsNew] = useState(false);
  const user = useSelector((state) => state.auth.authData);

  const addressAll = user.address?.map((address) => JSON.parse(address));

  const [newInfo, setNewInfo] = useState({
    phoneNumber: user.phoneNumber,
    value: addressAll?.[0]?.label + ' - ' + addressAll?.[0]?.position,
    address: addressAll?.[0]?.label,
    addressDetail: addressAll?.[0]?.position,
  });

  return (
    <>
      <DialogTitle fontWeight={600}>Xác nhận thông tin khách hàng</DialogTitle>

      <DialogContent>
        <div className="w-full">
          {/* <div>Bạn muốn sử dụng số điện thoại và địa chỉ hiện tại hay</div>
          <Button className="mx-2" variant="outlined" color="inherit" onClick={() => setIsNew(true)}>
            thông tin khác
          </Button>{' '}
          ? */}
          {addressAll && addressAll.length === 0 ? (
            <>
              <div>Chọn địa chỉ giao hàng: {}</div>
              <Select
                label="Select address"
                value={newInfo.address}
                onChange={(e) =>
                  setNewInfo({
                    ...newInfo,
                    address: e.target.value,
                    addressDetail: addressAll.find((address) => address.label === e.target.value).position,
                    value:
                      e.target.value + ' - ' + addressAll.find((address) => address.label === e.target.value).position,
                  })
                }
              >
                {addressAll?.map((address, index) => (
                  <MenuItem key={index} value={address.label}>
                    {address.label}
                  </MenuItem>
                ))}
              </Select>
              - {newInfo.addressDetail}
            </>
          ) : (
            <>
              Bạn chưa có thông tin giao hàng, vui lòng cập nhật để có thể đặt hàng. Cập nhật ngay:{' '}
              <Link to="/profile">Thông tin cá nhân</Link>
            </>
          )}
        </div>
        {/* {isNew && (
          <>
            <div>
              <TextField
                type="text"
                defaultValue={user.phoneNumber}
                name="phoneNumber"
                placeholder="Số điện thoại"
                onChange={(e) =>
                  setNewInfo({ ...newInfo, phoneNumber: e.target.value })
                }
                required
                sx={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                type="text"
                defaultValue={user.address}
                name="address"
                placeholder="Địa chỉ"
                onChange={(e) =>
                  setNewInfo({ ...newInfo, address: e.target.value })
                }
                required
              />
            </div>
          </>
        )} */}
      </DialogContent>

      {addressAll && addressAll.length === 0 && (
        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onSuccess(newInfo)}>
            Confirm
          </Button>
        </DialogActions>
      )}
    </>
  );
};

export default CartPopup;
