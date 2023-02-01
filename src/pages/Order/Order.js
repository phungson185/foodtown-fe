import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip,
  Typography,
  Paper,
  TextField,
} from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllOrdersByUser } from '../../actions/order'
import './styles.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const Order = () => {
  const orders = useSelector((state) => state.order.orders)
  const user = useSelector((state) => state.auth.authData)
  const dispatch = useDispatch()
  const [isShowModal, setIsShowModal] = useState(false)
  const [value, setValue] = useState('ibank')
  const [payment, setPayment] = useState({
    paymentName: `${user?.lastName} ${user?.firstName}`,
  })

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    dispatch(getAllOrdersByUser())
  }, [])

  const copy = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Đã copy')
  }

  const handleChangePayment = (e) => {
    setPayment((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmitPayment = () => {
    console.log(payment)
  }

  return (
    <div className="order__history-container">
      <ToastContainer />
      <div className="order__history-card">
        <div
          className="order__history-label"
          style={{ marginBottom: '20px', fontWeight: 700, fontSize: '28px' }}
        >
          <p>Danh sách đơn hàng</p>
        </div>
        {orders.map((order, index) => {
          return (
            <>
              <TableContainer style={{ border: 'solid 1px #333', marginBottom: '20px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 600, fontSize: '18px' }}>Ngày tạo</TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: '18px' }}>
                        Số điện thoại
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: '18px' }}>Tên món</TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: '18px' }}>Đơn giá</TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: '18px' }}>Số lượng</TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: '18px' }}>
                        Thành tiền
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.products?.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          {index === 0 ? (
                            <TableCell style={{ fontSize: '16px' }}>
                              {order?.createdAt?.substring(0, order?.createdAt?.indexOf('T'))}
                            </TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                          {index === 0 ? (
                            <TableCell style={{ fontSize: '16px' }}>{order?.phoneNumber}</TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                          <TableCell style={{ fontSize: '16px' }}>{item?.name}</TableCell>
                          <TableCell style={{ fontSize: '16px' }}>{item?.price + ' VNĐ'}</TableCell>
                          <TableCell style={{ fontSize: '16px' }}>{item?.quantity}</TableCell>
                          <TableCell style={{ fontSize: '16px' }}>
                            {item?.price * item?.quantity + ' VNĐ'}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              gap: '10px',
                              flexDirection: 'column',
                            }}
                          >
                            <div>
                              <span>Số điện thoại: </span>
                              <p>{order?.phoneNumber}</p>
                            </div>
                            <div>
                              <span>Địa chỉ: </span>
                              <p>{order?.address}</p>
                            </div>
                            <div>
                              <span>Trạng thái: </span>
                              <p
                                style={{
                                  color: order?.status ? 'green' : 'red',
                                }}
                              >
                                {order?.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
                              </p>
                            </div>
                            <p style={{ fontWeight: 600 }}>{`Tổng: ${order?.amount} VND`}</p>
                          </div>

                          <Button variant="outlined" onClick={() => setIsShowModal(true)}>
                            Thanh toán
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Modal
                open={isShowModal}
                onClose={() => setIsShowModal(false)}
                onBackdropClick={() => {
                  setPayment({
                    paymentName: `${user?.lastName} ${user?.firstName}`,
                  })
                }}
              >
                <Box sx={{ ...style, width: 500 }}>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ minWidth: 160 }}>
                          <Chip label="Chủ tài khoản" />
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          PHÙNG ĐÌNH SƠN
                        </Typography>
                        <div onClick={() => copy('PHÙNG ĐÌNH SƠN')} style={{ cursor: 'pointer' }}>
                          <ContentCopyIcon />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ minWidth: 160 }}>
                          <Chip label="Số tài khoản" />
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          120119896666
                        </Typography>
                        <div onClick={() => copy('120119896666')} style={{ cursor: 'pointer' }}>
                          <ContentCopyIcon />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ minWidth: 160 }}>
                          <Chip label="Chi nhánh" />
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          MBbank - CN HA NOI
                        </Typography>
                        <div
                          onClick={() => copy('MBbank - CN HA NOI')}
                          style={{ cursor: 'pointer' }}
                        >
                          <ContentCopyIcon />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ minWidth: 160 }}>
                          <Chip label="Nội dung chuyển khoản" />
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {order._id}
                        </Typography>
                        <div onClick={() => copy(order._id)} style={{ cursor: 'pointer' }}>
                          <ContentCopyIcon />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <FormControl sx={{ marginTop: 2 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Chọn hình thức thanh toán
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="ibank"
                        control={<Radio />}
                        label="Internet banking"
                      />
                      <FormControlLabel value="ATM" control={<Radio />} label="ATM" disabled />
                      <FormControlLabel
                        value="COD"
                        control={<Radio />}
                        label="Khi nhận hàng"
                        disabled
                      />
                    </RadioGroup>
                  </FormControl>
                  <Grid container rowSpacing={3} columnSpacing={2}>
                    <Grid item xs={12}>
                      <Paper>
                        <TextField
                          name="paymentName"
                          onChange={handleChangePayment}
                          required
                          fullWidth
                          value={payment.paymentName}
                          label="Họ và tên người gửi tiền"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper>
                        <TextField
                          name="paymentBank"
                          onChange={handleChangePayment}
                          required
                          fullWidth
                          label="Số tài khoản người gửi"
                        />
                      </Paper>
                    </Grid>
                    <Grid container item xs={12} columnSpacing={1} justifyContent="flex-end">
                      <Grid item justifyContent="flex-end">
                        <Button
                          size="large"
                          onClick={() => {
                            setPayment({ paymentName: `${user?.lastName} ${user?.firstName}` })
                            setIsShowModal(false)
                          }}
                          style={{ marginRight: '10px' }}
                        >
                          Hủy
                        </Button>
                      </Grid>
                      <Grid item justifyContent="flex-end">
                        <Button size="large" variant="contained" onClick={handleSubmitPayment}>
                          Thanh toán ngay
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Order
