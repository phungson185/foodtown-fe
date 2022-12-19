import React, { useState } from 'react'
import './styles.css'

const ProductSlider = ({ products, setCart }) => {
  const [productIndex, setProductIndex] = useState(
    Number(localStorage.getItem('product_index') || 0)
  )
  const product = products[productIndex]

  const [productOrders, setProductOrders] = useState(
    JSON.parse(localStorage.getItem('product_orders')) ||
      products.map((item, index) => {
        return {
          id: item._id,
          quantity: 1,
        }
      })
  )

  const switchPage = (step) => {
    let index
    if (productIndex === 0 && step < 0) {
      index = products?.length - 1
    } else if (productIndex === products?.length - 1 && step > 0) {
      index = 0
    } else {
      index = productIndex + step
    }
    setProductIndex(index)
    localStorage.setItem('product_index', index)
  }

  const increaseQuantity = () => {
    setProductOrders((prev) => {
      const newProductOrders = [...prev]
      newProductOrders[productIndex].quantity += 1
      localStorage.setItem('product_orders', JSON.stringify(newProductOrders))
      return newProductOrders
    })
  }

  const decreaseQuantity = () => {
    setProductOrders((prev) => {
      const newProductOrders = [...prev]
      if (newProductOrders[productIndex].quantity > 0) newProductOrders[productIndex].quantity -= 1
      localStorage.setItem('product_orders', JSON.stringify(newProductOrders))
      return newProductOrders
    })
  }

  function handleAddToCart() {
    if (productOrders[productIndex].quantity === 0) {
      return
    }
    setCart((prev) => {
      const newCart = [...prev]
      const productOrder = productOrders[productIndex]
      const product = products[productIndex]
      const productInCart = newCart.find((item) => item.id === productOrder.id)
      if (productInCart) {
        productInCart.quantity += productOrder.quantity
      } else {
        newCart.push({
          id: productOrder.id,
          name: product.name,
          price: product.price,
          quantity: productOrder.quantity,
          image: product?.image?.data,
        })
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      productOrders[productIndex].quantity = 1
      localStorage.setItem('product_orders', JSON.stringify([...productOrders]))
      return newCart
    })
  }

  return (
    <div className="menu-wrapper">
      <p className="menu-title">Thực đơn</p>
      <div className="product__slideshow">
        <div onClick={() => switchPage(-1)} className="slideshow-navigator prev">
          ❮
        </div>
        <div className="product__info-container">
          <div className="product__info-left">
            <img
              className="product__info-image"
              src={
                product?.image?.data !== undefined
                  ? `data:image/png;base64, ${Buffer.from(product?.image?.data).toString('base64')}`
                  : null
              }
              alt=""
            />
          </div>
          <div className="product__info-right">
            <div className="product__info-content">
              <p className="product__info-name">{product?.name}</p>
              <p className="product__info-ingredients">
                Nguyên liệu: {product?.ingredients?.join(', ')}
              </p>
              <p className="product__info-description">Mô tả: {product?.description}</p>
              <p className="product__info-price">
                Giá: <span className="product__info-number">{product?.price}</span> VND
              </p>
              <p className="product__info-quantity">
                Số lượng: <span className="product__info-number">{product?.quantity}</span> Suất
              </p>
            </div>
            <div className="product__order-container">
              <div className="product__order">
                <p className="product__quantity-title">Đặt hàng:</p>
                <p className="product__quantity-btn" onClick={decreaseQuantity}>
                  &#8722;
                </p>
                <p className="product__quantity">{productOrders[productIndex]?.quantity || 0}</p>
                <p className="product__quantity-btn" onClick={increaseQuantity}>
                  &#43;
                </p>
              </div>
              <button className="btn btn-order-cart" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div onClick={() => switchPage(1)} className="slideshow-navigator next">
          ❯
        </div>
      </div>
    </div>
  )
}

export default ProductSlider
