import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ProductSlider from "../../../components/productSlider/ProductSlider";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../actions/product";
import { createOrder } from "../../../actions/order";
import { RatingStar } from 'rating-star'
import "./styles.css";

Modal.setAppElement("#root");

const Menu = ({ setCart }) => {
  const data = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(data?.rating)

  const onRating = (score) => {
    setRating(score)
  }

  useEffect(() => {
    dispatch(getProducts(1, "", ""));
  }, []);

  return (
    <div className="menu-container" id="menu">
      {data.length > 0 && (
        <ProductSlider products={data} setCart={setCart} />
      )}
    </div>
  );
};

export default Menu;
