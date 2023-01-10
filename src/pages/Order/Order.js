import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllOrdersByUser } from "../../actions/order";
import "./styles.css";

const Order = () => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersByUser());
  }, []);

  return (
    <div className="order__history-container">
      <div className="order__history-card">
        <div className="order__history-label" style={{ marginBottom: "20px", fontWeight: 700, fontSize: '28px' }}>
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
                      <TableCell style={{ fontWeight: 600, fontSize: "18px" }}>Tên món</TableCell>
                      <TableCell style={{ fontWeight: 600, fontSize: "18px" }}>Đơn giá</TableCell>
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
                        <TableRow>
                          {index === 0 ? (
                            <TableCell style={{fontSize: "16px"}}>
                              {order?.createdAt?.substring(
                                0,
                                order?.createdAt?.indexOf("T")
                              )}
                            </TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                          {index === 0 ? (
                            <TableCell style={{fontSize: "16px"}}>{order?.phoneNumber}</TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                          <TableCell style={{fontSize: "16px"}}>{item?.name}</TableCell>
                          <TableCell style={{fontSize: "16px"}}>{item?.price}</TableCell>
                          <TableCell style={{fontSize: "16px"}}>{item?.quantity}</TableCell>
                          <TableCell style={{fontSize: "16px"}}>{item?.price * item?.quantity}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      margin: "10px",
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
                          color: order?.status ? "green" : "red",
                        }}
                      >
                        {order?.status ? "Đã thanh toán" : "Chưa thanh toán"}
                      </p>
                    </div>
                    <p
                      style={{ fontWeight: 600 }}
                    >{`Tổng: ${order?.amount}vnd`}</p>
                  </div>
                </Table>
              </TableContainer>
            </>
            // <div key={index}>
            //     <div className='order__history-item'>
            //         <div className='order__history-info-column'>
            //             <div className='order__history-info__item'>
            //                 <p className='order__history-subtitle'>{order?._id}</p>
            //                 <p className='order__history-title'>{order?.productId?.name}</p>
            //             </div>
            //             <div className='order__history-info__item'>
            //                 <p className='order__history-subtitle'>Đặt ngày</p>
            //                 <p className='order__history-title'>{order?.productId?.createdAt?.substring(0, order?.productId?.createdAt?.indexOf('T'))}</p>
            //             </div>
            //         </div>
            //         <div className='order__history-info-right'>
            //             <div className='order__history-info-column'>
            //                 <div className='order__history-info__item'>
            //                     <p className='order__history-subtitle'>Đã thanh toán</p>
            //                     <p className='order__history-title'>{order?.paid} VND</p>
            //                 </div>
            //                 <div className='order__history-info__item'>
            //                     <p className='order__history-subtitle'>Đơn giá</p>
            //                     <p className='order__history-title'>{order?.productId?.price} VND</p>
            //                 </div>
            //             </div>
            //             <div className='order__history-info-column'>
            //                 <div className='order__history-info-price'>
            //                     <div className='order__history-info__item'>
            //                         <p className='order__history-subtitle'>Số lượng</p>
            //                         <p className='order__history-title'>{parseInt(order?.amount) / parseInt(order?.productId?.price)}</p>
            //                     </div>
            //                     <div className='order__history-info__item'>
            //                         <p className='order__history-subtitle'>Tổng</p>
            //                         <p className='order__history-title'>{order?.amount} VND</p>
            //                     </div>
            //                 </div>
            //                 <div className='order__history-info-payment'>
            //                     <div className='order__history-info__item'>
            //                         <p className='order__history-subtitle'>Trạng thái</p>
            //                         <p className='order__history-title'>{order?.status ? "Đã hoàn thành" : "Chưa hoàn thành"}</p>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <hr/>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
