import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./styles.css";
import { PaymentStatusType } from "../../../utils/enum";
import { getAllPayments, updatePayment } from "../../../api";
import { Chip } from "@mui/material";
import { useDispatch } from "react-redux";

const Payment = ({ payment, getPayments }) => {
  const changeStatusPayment = async (status) => {
    const res = await updatePayment({
      paymentId: payment._id,
      status: status,
      paid: payment.paid,
    });

    if (res.status === 200) {
      getPayments();
    }
  };

  const renderPaymentStatus = (status, amount = 0) => {
    switch (status) {
      case PaymentStatusType.PENDING:
        return <Chip label={"Chờ xác nhận"} color="warning" />;
      case PaymentStatusType.APPROVED:
        return <Chip label={"Đã xác nhận"} color="success" />;
      case PaymentStatusType.LACK:
        return (
          <Chip
            label={`Chưa đủ số tiền, còn thiếu ${amount} VND`}
            color="info"
          />
        );
      case PaymentStatusType.REJECTED:
        return <Chip label={"Từ chối"} color="error" />;
      default:
        return <Chip label={"Thất bại"} color="error" />;
    }
  };

  return (
    <div className="product__management-container">
      <div className="product__management-left">
        <Typography variant="h5">Mã thanh toán: {payment._id}</Typography>
        <Typography>
          <span style={{ fontWeight: 600 }}>Tổng</span>: {payment.amount} VND
        </Typography>
        <Typography>
          <span style={{ fontWeight: 600 }}>Đã trả</span>: {payment.paid} VND
        </Typography>
        <Typography>
          <span style={{ fontWeight: 600 }}>Khách hàng</span>:{" "}
          {payment.userId.firstName + " " + payment.userId.lastName}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 600 }}>Địa chỉ</span>:{" "}
          {payment.orderId?.address}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 600 }}>Số điện thoại</span>:{" "}
          {payment.orderId?.phoneNumber}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 600 }}>Nội dung chuyển khoản</span>:{" "}
          {"DH" + payment.orderId._id.substring(payment.orderId._id.length - 6)}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 600 }}>Trạng thái</span>:{" "}
          {renderPaymentStatus(payment.status, payment.orderId.amountLack)}
        </Typography>
      </div>
      <div className="product__management-right">
        <div className="product__management-buttons">
          <Button
            variant="contained"
            onClick={() => changeStatusPayment(PaymentStatusType.APPROVED)}
            // disabled={
            //   payment.status !== PaymentStatusType.PENDING
            // }
          >
            Chấp nhận
          </Button>
          <Button
            variant="contained"
            onClick={() => changeStatusPayment(PaymentStatusType.REJECTED)}
            color="error"
            // disabled={
            //   payment.status !== PaymentStatusType.PENDING
            // }
          >
            Từ chối
          </Button>
          <Button
            variant="contained"
            onClick={() => changeStatusPayment(PaymentStatusType.LACK)}
            color="warning"
            // disabled={
            //   payment.status !== PaymentStatusType.PENDING
            // }
          >
            Thiếu tiền
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
