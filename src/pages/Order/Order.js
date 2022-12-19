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
        <div className="order__history-label" style={{marginBottom: '20px'}}>
          <p>Danh sách đơn hàng</p>
        </div>
        {orders.map((order, index) => {
          return (
            <>
              <TableContainer style={{border: 'solid 1px #333', marginBottom: '20px'}}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 600 }}>
                        Ngày tạo
                      </TableCell>
                      <TableCell style={{ fontWeight: 600 }}>
                        Số điện thoại
                      </TableCell>
                      <TableCell style={{ fontWeight: 600 }}>Tên món</TableCell>
                      <TableCell style={{ fontWeight: 600 }}>Đơn giá</TableCell>
                      <TableCell style={{ fontWeight: 600 }}>
                        Số lượng
                      </TableCell>
                      <TableCell style={{ fontWeight: 600 }}>
                        Thành tiền
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.products?.map((item, index) => {
                      return (
                        <TableRow>
                          {index === 0 ? (
                            <TableCell>
                              {order?.createdAt?.substring(
                                0,
                                order?.createdAt?.indexOf("T")
                              )}
                            </TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                          {index === 0 ? (
                            <TableCell>{order?.phoneNumber}</TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                          <TableCell>{item?.name}</TableCell>
                          <TableCell>{item?.price}</TableCell>
                          <TableCell>{item?.quantity}</TableCell>
                          <TableCell>{item?.price * item?.quantity}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <caption style={{ padding: "15px" }}>{`Trạng thái: ${
                    order?.status ? "Đã thanh toán" : "Chưa thanh toán"
                  }`}</caption>
                  <caption
                    style={{ padding: "15px" }}
                  >{`Tổng: ${order?.amount}`}</caption>
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
