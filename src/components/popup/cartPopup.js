import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./cartPopup.css";

const CartPopup = ({ onSuccess, onClose }) => {
  const [isNew, setIsNew] = useState(false);
  const user = useSelector((state) => state.auth.authData);

  const [newInfo, setNewInfo] = useState({
    phoneNumber: user.phoneNumber,
    address: user.address,
  });
  return (
    <>
      <DialogTitle fontWeight={600}>Xác nhận thông tin khách hàng</DialogTitle>

      <DialogContent>
        <div className="flex-center w-full">
          <div>Bạn muốn sử dụng số điện thoại và địa chỉ hiện tại hay</div>
          <Button
            className="mx-2"
            variant="outlined"
            color="inherit"
            onClick={() => setIsNew(true)}
          >
            thông tin khác
          </Button>{" "}
          ?
        </div>
        {isNew && (
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
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => onSuccess(newInfo)}>
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

export default CartPopup;
