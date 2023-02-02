import React from 'react'
import Typography from '@mui/material/Typography'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import MessageIcon from '@mui/icons-material/Message'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Button from '@mui/material/Button'
import './styles.css'

const Payment = ({ product, updateProduct, setUpdatingProduct }) => {
  const onUpdateProduct = () => {
    setUpdatingProduct(product)
    updateProduct(false)
  }

  return (
    <div className="product__management-container">
      <div className="product__management-left">
        <Typography variant="h5">{product.name}</Typography>
        <Typography>{product.description.substring(0, 150)}...</Typography>
        <Typography>Nguyên liệu: {product.ingredients.join(', ')}</Typography>
        <div className="product__management-info">
          <Typography>Giá: {product.price} VND</Typography>
          <Typography>Số lượng: {product.quantity} suất</Typography>
          <Typography>Đánh giá: {product.rating}</Typography>
        </div>
      </div>
      <div className="product__management-right">
        {/* <div className='product__management-statistic'>
                    <div className='product__management-like'>
                        <ThumbUpIcon color="primary" />
                        <Typography >{product.likeCount}</Typography>
                    </div>
                    <div className='product__management-comment'>
                        <MessageIcon color="primary" />
                        <Typography >{product.commentCount}</Typography>
                    </div>
                    <div className='product__management-view'>
                        <VisibilityIcon color="primary" />
                        <Typography >{product.viewCount}</Typography>
                    </div>
                </div> */}
        <div className="product__management-buttons">
          <Button variant="contained" onClick={onUpdateProduct}>
            Edit
          </Button>
          <Button variant="contained" onClick={null} color="error">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Product
