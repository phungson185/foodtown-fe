import React from "react";
import QRCODE_IMAGE from "../../assets/momo-qr-code.png";
import { createOrder } from "../../api";
import "./styles.css";
import { Dialog } from "@mui/material";
import { CartPopup } from "../../components/popup";
import { toast, ToastContainer } from "react-toastify";

const Cart = ({ cart, setCart, user }) => {
  const increaseQuantity = (productIndex) => {
    setCart((prev) => {
      const currentCart = [...prev];
      currentCart[productIndex].quantity++;
      localStorage.setItem("cart", JSON.stringify(currentCart));
      return currentCart;
    });
  };

  const decreaseQuantity = (productIndex) => {
    setCart((prev) => {
      const currentCart = [...prev];
      if (currentCart[productIndex].quantity > 0)
        currentCart[productIndex].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(currentCart));
      return currentCart;
    });
  };

  const handleOrder = async (newInfo) => {
    if (user) {
      if (
        (!newInfo.phoneNumber && !user.phoneNumber) ||
        (!newInfo.address && !user.address)
      ) {
        toast.error("Bạn cần cập nhật thông tin cá nhân để tiếp tục");
        return;
      }

      const quantity = cart.reduce((total, order) => order.quantity + total, 0);
      const amount = cart.reduce(
        (total, order) => order.quantity * order.price + total,
        0
      );
      const newCart = cart.map(({ image, ...keepInfos }) => keepInfos);
      const res = await createOrder({
        userId: user._id,
        amount,
        products: newCart,
        phoneNumber: newInfo.phoneNumber || user.phoneNumber,
        address: newInfo.address || user.address,
      });

      if (res.data.success) {
        localStorage.removeItem("cart");
        setCart([]);
      }
    } else {
      toast.error("Bạn cần đăng nhập để tiếp tục");
      return;
    }
  };

  const handleCancelProduct = (productIndex) => {
    setCart((prev) => {
      const newCart = [...prev];
      newCart.splice(productIndex, 1);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const [openPopup, setOpenPopup] = React.useState(false);

  return (
    <>
      <div className="cart__history-container">
        <ToastContainer />
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
                            <p className="cart__history-title">
                              {order?.price} VND
                            </p>
                          </div>
                        </div>
                        <div className="cart__history-info-column">
                          <div className="cart__history-info__item">
                            <p className="cart__history-subtitle">Số lượng</p>
                            <div>
                              <p
                                className="product__quantity-btn m-0 p-1"
                                onClick={() => decreaseQuantity(index)}
                              >
                                &#8722;
                              </p>
                              <p className="cart__history-title">
                                {order?.quantity}
                              </p>
                              <p
                                className="product__quantity-btn m-0 p-1"
                                onClick={() => increaseQuantity(index)}
                              >
                                &#43;
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="cart__history-info-column">
                          <div className="cart__history-info__item cart__history-info__total">
                            <p className="cart__history-subtitle">Tổng</p>
                            <p className="cart__history-title">
                              {order?.quantity * order?.price} VND
                            </p>
                          </div>
                        </div>
                        <div className="cart__history-info-column">
                          <div className="cart__history-info__item cart__history-info__total">
                            <p className="cart__history-subtitle"></p>
                            <p className="cart__history-title">
                              <button
                                onClick={() => handleCancelProduct(index)}
                              >
                                Remove
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <div className="cart__history-total">
                Tổng tiền:{" "}
                <span className="cart__history-total__number">
                  {cart.reduce(
                    (total, order) => order.quantity * order.price + total,
                    0
                  )}
                </span>{" "}
                VND
              </div>
            </>
          ) : (
            <div className="cart__history_empty">Bạn chưa thêm giỏ hàng.</div>
          )}
        </div>

        <div className="cart__payment">
          <img className="cart__payment-qr" src={QRCODE_IMAGE} alt="" />
          <p className="cart__payment-subtitle">
            Hãy chuyển khoản bằng cách quét mã QR để thanh toán đặt hàng
          </p>
        </div>
      </div>
      {cart.length > 0 && (
        <div className="cart__order-position">
          <button
            className="cart__order-button"
            onClick={() => setOpenPopup(true)}
          >
            Đặt hàng
          </button>
        </div>
      )}

      <Dialog open={openPopup} fullWidth maxWidth="sm">
        <CartPopup
          onClose={() => setOpenPopup(false)}
          onSuccess={handleOrder}
        />
      </Dialog>
    </>
  );
};

export default Cart;
