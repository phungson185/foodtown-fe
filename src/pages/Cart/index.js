import React from 'react';
import QRCODE_IMAGE from '../../assets/momo-qr-code.png';

import './styles.css';

const Cart = ({ cart }) => {
  return (
    <div className="cart__history-container">
      <div className="cart__history-card">
        <div className="cart__history-label">
          <p>Giỏ hàng</p>
        </div>
        {cart.length > 0 ? (
          <>
            {cart?.map((order, index) => {
              return (
                <div key={index}>
                  <div className="cart__history-item">
                    <div className="cart__history-info-column">
                      <div className="cart__history-info__item">
                        <p className="cart__history-subtitle">Tên món</p>
                        <p className="cart__history-title">{order?.name}</p>
                      </div>
                    </div>
                    <div className="cart__history-info-right">
                      <div className="cart__history-info-column">
                        <div className="cart__history-info__item">
                          <p className="cart__history-subtitle">Đơn giá</p>
                          <p className="cart__history-title">{order?.price} VND</p>
                        </div>
                      </div>
                      <div className="cart__history-info-column">
                        <div className="cart__history-info__item">
                          <p className="cart__history-subtitle">Số lượng</p>
                          <p className="cart__history-title">{order?.quantity}</p>
                        </div>
                      </div>
                      <div className="cart__history-info-column">
                        <div className="cart__history-info__item cart__history-info__total">
                          <p className="cart__history-subtitle">Tổng</p>
                          <p className="cart__history-title">{order?.quantity * order?.price} VND</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
            <div className="cart__history-total">
              Tổng tiền:{' '}
              <span className="cart__history-total__number">
                {cart.reduce((total, order) => order.quantity * order.price + total, 0)}
              </span>{' '}
              VND
            </div>
          </>
        ) : (
          <div className="cart__history_empty">Bạn chưa thêm giỏ hàng.</div>
        )}
      </div>
      <div className="cart__payment">
        <img className="cart__payment-qr" src={QRCODE_IMAGE} alt="" />
        <p className="cart__payment-subtitle">Hãy chuyển khoản bằng cách quét mã QR để thanh toán đặt hàng</p>
      </div>
    </div>
  );
};

export default Cart;
