import React from 'react'
import './styles.css'

const ProductSlider = ({products, popupModal, productIndex, setProductIndex, quantity, setQuantity}) => {

    const product = products[productIndex];

    const switchPage = (step) => {
        setProductIndex(prev => {
            if (prev === 0 && step < 0) {
                return products?.length - 1;
            } else if (prev === products?.length - 1 && step > 0) {
                return 0;
            } else {
                return prev + step;
            }
        });
    }

    const increaseQuantity = () => {
        setQuantity(prev => product?.quantity > prev ? prev + 1 : prev);
    }

    const decreaseQuantity = () => {
        quantity !== 1 && setQuantity(prev => prev - 1);
    }

    return (
        <div className='menu-wrapper'>
            <p className='menu-title'>Thực đơn</p>
            <div className='product__slideshow'>
                <div onClick={() => switchPage(-1)} className='slideshow-navigator prev'>❮</div>
                <div className='product__info-container'>
                    <div className='product__info-left'>
                        <img className='product__info-image' src={product?.image?.data !== undefined ? `data:image/png;base64, ${Buffer.from(product?.image?.data).toString('base64')}` : null} alt="" />
                    </div>
                    <div className='product__info-right'>
                        <div className='product__info-content'>
                            <p className='product__info-name'>{product?.name}</p>
                            <p className='product__info-ingredients'>Nguyên liệu: {product?.ingredients?.join(', ')}</p>
                            <p className='product__info-description'>Mô tả: {product?.description}</p>
                            <p className='product__info-price'>Giá: {product?.price} VND</p>
                            <p className='product__info-quantity'>Số lượng: {product?.quantity} Suất</p>
                        </div>
                        <div className='product__order-container'>
                            <div className='product__order'>
                                <p className='product__quantity-title'>Đặt hàng:</p>
                                <p className='product__quantity-btn' onClick={increaseQuantity}>&#43;</p>
                                <p className='product__quantity'>{quantity}</p>
                                <p className='product__quantity-btn' onClick={decreaseQuantity}>&#8722;</p>
                            </div>
                            <button className='btn btn-order' onClick={popupModal}>Đặt ngay</button>
                        </div>
                    </div>
                </div>
                <div onClick={() => switchPage(1)} className='slideshow-navigator next'>❯</div>
            </div>
        </div>
    )
}

export default ProductSlider