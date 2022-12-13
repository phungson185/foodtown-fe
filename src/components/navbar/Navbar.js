import React from "react";
import { logout } from "../../actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { BsClockHistory, BsFillCartCheckFill } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import logo from "../../assets/foodtown-ava.png";
import "./styles.css";
import { useDispatch } from "react-redux";
import { ADMIN } from "../../constants/role";

const Navbar = ({ user, cart, setCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignIn = () => {
    navigate(
      `${localStorage.getItem("role") === ADMIN ? "/admin/login" : "/auth"}`
    );
  };

  const onLogout = () => {
    // remove local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(logout());
    navigate("/auth");
  };

  const onViewOrders = () => {
    navigate("/order");
  };

  function handleCancelOrder() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  const navItems = [
    {
      name: "Chúng tôi",
      id: "#about",
    },
    {
      name: "Thực đơn",
      id: "#menu",
    },
    {
      name: "Bài viết",
      id: "#blogs",
    },
    {
      name: "Liên hệ",
      id: "#contact",
    },
  ];

  return (
    <>
      {user?.role != "ADMIN" && (
        <div className="navbar-container">
          <div className="navbar-left-container">
            <Link to="/" className="navbar-home navbar-item">
              <img src={logo} alt="navbar-logo" className="navbar-logo" />
              <p className="navbar-name">Food Town</p>
            </Link>
            {navItems.map((item, i) => (
              <a href={item.id} key={i} className="navbar-item">
                {item.name.toUpperCase()}
              </a>
            ))}
          </div>
          <div className="navbar-right-container">
            {user ? (
              <>
                <div className="dropdown">
                  <div className="navbar-cart-box">
                    <BsFillCartCheckFill className="navbar-cart" size={24} />
                    <span className="navbar-cart-number">{cart.length}</span>
                  </div>
                  <div className="dropdown-content">
                    <div className="dropdown-content-wrapper">
                      {cart.length > 0 ? (
                        cart?.map((order, index) => (
                          <div className="dropdown-item" key={index}>
                            <img
                              className="dropdown-item-left"
                              src={
                                order?.image !== undefined
                                  ? `data:image/png;base64, ${Buffer.from(
                                      order?.image
                                    ).toString("base64")}`
                                  : null
                              }
                              alt=""
                            />
                            <div className="dropdown-item-right">
                              <p className="dropdown-item-name">
                                {order?.name}
                              </p>
                              <p className="dropdown-item-price">
                                Price: {order?.price} VND
                              </p>
                              <p className="dropdown-item-quantity">
                                Quantity: {order?.quantity}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <span>Bạn chưa thêm giỏ hàng.</span>
                      )}
                    </div>
                    <div className="dropdown-item">
                      {cart.length > 0 && (
                        <button
                          className="btn btn-cancel-order"
                          onClick={handleCancelOrder}
                        >
                          Đặt lại
                        </button>
                      )}
                      <button
                        className="btn btn-view-order"
                        onClick={() => navigate("/cart")}
                      >
                        Xem giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
                <BsClockHistory
                  className="navbar-order"
                  size={24}
                  onClick={onViewOrders}
                />
                <div className="dropdown">
                  <MdOutlineAccountCircle className="navbar-cart" size={26} />
                  <div className="dropdown-content">
                    <p onClick={onLogout}>ĐĂNG XUẤT</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="navbar-item" onClick={onSignIn}>
                ĐĂNG NHẬP
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
