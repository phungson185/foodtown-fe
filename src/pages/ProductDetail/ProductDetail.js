import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFoodById } from '../../actions/product'
import { RatingStar } from 'rating-star'
import './styles.css'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetail = () => {
  const productData = useSelector((state) => state.product.products[0])
  const [currentQuantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(productData?.rating)
  const { id } = useParams()
  const dispatch = useDispatch()

  console.log(productData)

  useEffect(() => {
    dispatch(getFoodById(id))
  }, [])

  const onRating = (score) => {
    setRating(score)
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    currentQuantity !== 1 && setQuantity((prev) => prev - 1)
  }

  const addToCart = () => {
    let modal = document.getElementById('modal')
    modal.className = 'visible-modal'
    let container = document.getElementById('container')
    container.style = 'opacity: 30%'
  }

  const hideModal = () => {
    let modal = document.getElementById('modal')
    modal.className = 'modal'
    let container = document.getElementById('container')
    container.style = 'opacity: 100%'
  }

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail-container" id="container">
        <div className="product-detail-main">
          <div className="product-detail-left">
            <img
              src={
                productData?.image !== undefined
                  ? `data:image/png;base64, ${Buffer.from(productData?.image.data).toString(
                      'base64'
                    )}`
                  : null
              }
              alt=""
              className="product-detail-image"
            />
          </div>
          <div className="product-detail-right">
            <p className="product-detail-name">{productData?.name}</p>
            <p className="product-detail-description">{productData?.description}</p>
          </div>
          <div className="product-detail-rating">
            <RatingStar
              id={productData?._id}
              clickable
              noBorder={false}
              rating={rating}
              className="product-detail-rating"
              size={32}
              onRatingChange={onRating}
            />
          </div>
          <div className="product-detail-sell">
            <div className="product-detail-price">
              <p>Giá: {productData?.price} VND</p>
            </div>
            <div className="product-detail-btns">
              <div className="product-detail-quantity">
                <p className="cart-product-btn increament-btn" onClick={increaseQuantity}>
                  &#43;
                </p>
                <p>{currentQuantity}</p>
                <p className="cart-product-btn decreament-btn" onClick={decreaseQuantity}>
                  &#8722;
                </p>
              </div>
              <div className="btn btn-transparent" onClick={addToCart}>
                Order
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" id="modal">
        <p>Added to cart successfully</p>
        <button className="btn btn-transparent modal-btn" onClick={hideModal}>
          OK
        </button>
      </div>
    </div>
  )
}

export default ProductDetail
