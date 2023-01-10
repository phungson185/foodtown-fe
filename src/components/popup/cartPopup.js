import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import './cartPopup.css'

const CartPopup = ({ onSuccess, onClose }) => {
  const [isNew, setIsNew] = useState(false)
  const user = useSelector((state) => state.auth.authData)

  const [newInfo, setNewInfo] = useState({ phoneNumber: user.phoneNumber })
  return (
    <>
      <DialogTitle>CONFIRMATION</DialogTitle>

      <DialogContent>
        <div className="flex-center w-full">
          <div>Bạn muốn sử dụng số điện thoại hiện tại hay</div>
          <Button
            className="mx-2"
            variant="outlined"
            color="inherit"
            onClick={() => setIsNew(true)}
          >
            mới
          </Button>{' '}
          ?
        </div>
        {isNew && (
          <div>
            <TextField
              type="text"
              defaultValue={user.phoneNumber}
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={(e) => setNewInfo({ ...newInfo, phoneNumber: e.target.value })}
              required
            />
          </div>
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
  )
}

export default CartPopup
