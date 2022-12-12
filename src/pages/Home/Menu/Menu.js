import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import ProductSlider from '../../../components/productSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../actions/product'
import { createOrder } from '../../../actions/order';
import './styles.css'

Modal.setAppElement('#root');

const Menu = ({setCart}) => {
  const data = useSelector(state => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(1, '', ''));
  }, [])

  return (
    <div className='menu-container container wrapper' id='menu'>
        <ProductSlider products={data} setCart={setCart} />
    </div>
  )
}

export default Menu