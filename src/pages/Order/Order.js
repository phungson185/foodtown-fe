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
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllOrdersByUser } from "../../actions/order";
import "./styles.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { createPayment } from "../../api";
import { OrderStatusType } from "../../utils/enum";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Order = () => {
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [value, setValue] = useState("ibank");
  const [selectedOrder, setSelectedOrder] = useState();
  const [payment, setPayment] = useState({
    paymentName: `${user?.lastName} ${user?.firstName}`,
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    dispatch(getAllOrdersByUser());
  }, []);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã copy");
  };

  const handleChangePayment = (e) => {
    setPayment((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmitPayment = async () => {
    const res = await createPayment({
      amount: selectedOrder.amount,
      orderId: selectedOrder._id,
      paid: payment.paymentPaid,
      bank: payment.paymentBank,
    });

    if (res.data.success) {
      setIsShowModal(false);
      setSelectedOrder(undefined);
      toast.success("Tạo đơn thanh toán thành công");
      dispatch(getAllOrdersByUser());
    } else {
      toast.warning("Tạo đơn thanh toán thất bại");
    }
  };

  const renderPaymentStatus = (status, amount) => {
    if (status === OrderStatusType.ORDER_PAYMENT_PENDING) {
      return <Chip label="Chưa thanh toán" color="primary" />;
    } else if (status === OrderStatusType.ORDER_PAYMENT_CONFIRMING) {
      return <Chip label="Đang chờ xác nhận" color="warning" />;
    } else if (status === OrderStatusType.ORDER_PAYMENT_COMPLETED) {
      return <Chip label="Đã thanh toán" color="success" />;
    } else if (status === OrderStatusType.ORDER_PAYMENT_LACK) {
      return (
        <Chip
          label={`Chưa đủ số tiền, còn thiếu ${amount} VND`}
          color="secondary"
        />
      );
    } else if (status === OrderStatusType.ORDER_CANCEL) {
      return <Chip label="Từ chối" color="error" />;
    } else if (status === OrderStatusType.ORDER_FAIL) {
      return <Chip label="Thất bại" color="error" />;
    }
  };

  return (
    <div className="order__history-container">
      <ToastContainer />
      <div className="order__history-card">
        <div
          className="order__history-label"
          style={{ marginBottom: "20px", fontWeight: 700, fontSize: "28px" }}
        >
          <p>Danh sách đơn hàng</p>
        </div>
        {orders.map((order, index) => {
          return (
            <>
              <TableContainer
                style={{ border: "solid 1px #333", marginBottom: "20px" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 600, fontSize: "18px" }}>
                        Ngày tạo
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: "18px" }}>
                        Số điện thoại
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: "18px" }}>
                        Tên món
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: "18px" }}>
                        Đơn giá
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: "18px" }}>
                        Số lượng
                      </TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: "18px" }}>
                        Thành tiền
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.products?.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          {index === 0 ? (
                            <TableCell style={{ fontSize: "16px" }}>
                              {order?.createdAt?.substring(
                                0,
                                order?.createdAt?.indexOf("T")
                              )}
                            </TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                          {index === 0 ? (
                            <TableCell style={{ fontSize: "16px" }}>
                              {order?.phoneNumber}
                            </TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                          <TableCell style={{ fontSize: "16px" }}>
                            {item?.name}
                          </TableCell>
                          <TableCell style={{ fontSize: "16px" }}>
                            {item?.price + " VNĐ"}
                          </TableCell>
                          <TableCell style={{ fontSize: "16px" }}>
                            {item?.quantity}
                          </TableCell>
                          <TableCell style={{ fontSize: "16px" }}>
                            {item?.price * item?.quantity + " VNĐ"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexDirection: "column",
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
                                  fontWeight: "bold",
                                }}
                              >
                                {renderPaymentStatus(
                                  order?.status,
                                  order?.amountLack
                                )}
                              </p>
                            </div>
                            <p
                              style={{ fontWeight: 600 }}
                            >{`Tổng: ${order?.amount} VND`}</p>
                          </div>

                          {[
                            OrderStatusType.ORDER_PAYMENT_PENDING,
                            OrderStatusType.ORDER_PAYMENT_LACK,
                            OrderStatusType.ORDER_CANCEL,
                          ].includes(order.status) && (
                            <Button
                              variant="outlined"
                              onClick={() => {
                                setSelectedOrder(order);
                                setPayment({
                                  ...payment,
                                  paymentPaid: order.amount,
                                });
                                setIsShowModal(true);
                              }}
                            >
                              Thanh toán
                            </Button>
                          )}
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
                    paymentPaid: order?.amount,
                  });
                }}
              >
                <Box sx={{ ...style, width: 500 }}>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div style={{ minWidth: 160 }}>
                          <Chip label="Chủ tài khoản" />
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Đỗ Việt Hoàng
                        </Typography>
                        <div
                          onClick={() => copy("Đỗ Việt Hoàng")}
                          style={{ cursor: "pointer" }}
                        >
                          <ContentCopyIcon />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div style={{ minWidth: 160 }}>
                          <Chip label="Số tài khoản" />
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          120119896666
                        </Typography>
                        <div
                          onClick={() => copy("120119896666")}
                          style={{ cursor: "pointer" }}
                        >
                          <ContentCopyIcon />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div style={{ minWidth: 160 }}>
                          <Chip label="Chi nhánh" />
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          MBbank - CN HA NOI
                        </Typography>
                        <div
                          onClick={() => copy("MBbank - CN HA NOI")}
                          style={{ cursor: "pointer" }}
                        >
                          <ContentCopyIcon />
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div style={{ minWidth: 160 }}>
                          <Chip label="Nội dung chuyển khoản" />
                        </div>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {"DH" + order._id.substring(order._id.length - 6)}
                        </Typography>
                        <div
                          onClick={() => copy(order._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <ContentCopyIcon />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  {/* <FormControl sx={{ marginTop: 2 }}>
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
                      <FormControlLabel
                        value="ATM"
                        control={<Radio />}
                        label="ATM"
                        disabled
                      />
                      <FormControlLabel
                        value="COD"
                        control={<Radio />}
                        label="Khi nhận hàng"
                        disabled
                      />
                    </RadioGroup>
                  </FormControl> */}

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", margin: "20px 0px" }}
                  >
                    Thông tin người gửi
                  </Typography>

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
                    {/* <Grid item xs={12}>
                      <Paper>
                        <TextField
                          name="paymentBank"
                          onChange={handleChangePayment}
                          required
                          fullWidth
                          label="Số tài khoản người gửi"
                        />
                      </Paper>
                    </Grid> */}
                    <Grid item xs={12}>
                      <Paper>
                        <TextField
                          name="paymentPaid"
                          onChange={handleChangePayment}
                          required
                          fullWidth
                          value={payment.paymentPaid}
                          label="Số tiền thanh toán"
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
                          onClick={() => {
                            setPayment({
                              paymentName: `${user?.lastName} ${user?.firstName}`,
                              paymentPaid: order?.amount,
                            });
                            setIsShowModal(false);
                          }}
                          style={{ marginRight: "10px" }}
                        >
                          Hủy
                        </Button>
                      </Grid>
                      <Grid item justifyContent="flex-end">
                        <Button
                          size="large"
                          variant="contained"
                          onClick={handleSubmitPayment}
                        >
                          Thanh toán ngay
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
