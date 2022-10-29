import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import ProductSlider from '../../../components/productSlider/ProductSlider';
import QRCODE_IMAGE from '../../../assets/momo-qr-code.png';
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../actions/product'
import './styles.css'
import { createOrder } from '../../../actions/order';
Modal.setAppElement('#root');

const Menu = () => {

  const [productIndex, setProductIndex] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const data = useSelector(state => state.product.products);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(1, '', ''));
  }, [])

  function openModal() {
    dispatch(createOrder({productId: data[productIndex]._id, price: data[productIndex].price, amount: data[productIndex].price * quantity}));
    setIsOpen(true);
  }

  function closeModal() {
    setQuantity(1);
    setIsOpen(false);
  }

  return (
    <div className='menu-container container wrapper' id='menu'>
        <ProductSlider products={data} popupModal={openModal} setProductIndex={setProductIndex} productIndex={productIndex} quantity={quantity} setQuantity={setQuantity} />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="menu-modal-container"
          overlayClassName="menu-modal-overlay"
        >
          <img className='modal-qr' src={QRCODE_IMAGE} alt="" />
          <p className='modal-title'>Bạn đã đặt thành công {quantity} suất ăn!</p>
          <p className='modal-subtitle'>Hãy chuyển khoản {quantity * data[productIndex]?.price}đ bằng cách quét mã QR để thanh toán đặt hàng</p>
          <div>
            <button className='btn btn-transparent' onClick={closeModal}>OK</button>
          </div>
        </Modal>
    </div>
  )
}

export default Menu