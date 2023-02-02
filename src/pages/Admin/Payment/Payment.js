import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import './styles.css'
import { PaymentStatusType } from '../../../utils/enum'
import { updatePayment } from '../../../api'

const Payment = ({ payment, getPayments }) => {
  const changeStatusPayment = async (status) => {
    const res = await updatePayment({
      paymentId: payment._id,
      status: status,
      paid: payment.paid,
    })

    if (res.status === 200) {
      getPayments()
    }
  }

  return (
    <div className="product__management-container">
      <div className="product__management-left">
        <Typography variant="h5">Order: {payment._id}</Typography>
        <Typography>Tổng: {payment.amount}</Typography>
        <Typography>Đã trả: {payment.paid}</Typography>
        <Typography>Người thanh toán: {payment.userId}</Typography>
        <div className="product__management-info">
          <Typography>Bank: {payment.bank} VND</Typography>
          <Typography>Trạng thái: {PaymentStatusType[payment.status]}</Typography>
        </div>
      </div>
      <div className="product__management-right">
        <div className="product__management-buttons">
          <Button
            variant="contained"
            onClick={() => changeStatusPayment(PaymentStatusType.APPROVED)}
            disabled={
              payment.status !== PaymentStatusType.APPROVED &&
              payment.status !== PaymentStatusType.PENDING
            }
          >
            Approve
          </Button>
          <Button
            variant="contained"
            onClick={() => changeStatusPayment(PaymentStatusType.REJECTED)}
            color="error"
            disabled={
              payment.status !== PaymentStatusType.REJECTED &&
              payment.status !== PaymentStatusType.PENDING
            }
          >
            Reject
          </Button>
          <Button
            variant="contained"
            onClick={() => changeStatusPayment(PaymentStatusType.LACK)}
            color="warning"
            disabled={
              payment.status !== PaymentStatusType.LACK &&
              payment.status !== PaymentStatusType.PENDING
            }
          >
            Lack
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Payment
