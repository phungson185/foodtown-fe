import React from 'react'
import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import MessageIcon from '@mui/icons-material/Message'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Typography from '@mui/material/Typography'
import util from '../../../../utils/index'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../../../../actions/blog'
import './styles.css'

const Blog = ({ blog, updatingBlog, updatingBlogContent, setType }) => {
  const dispatch = useDispatch()

  const onUpdatingBlogContent = () => {
    updatingBlogContent(blog)
    updatingBlog(false)
    setType('UPDATE')
  }

  const onDeleteBlog = () => {
    dispatch(deleteBlog(blog._id))
  }

  return (
    <div className="blog__management-container">
      <div className="blog__management-left">
        <Typography variant="h5">{blog.name}</Typography>
        <Typography>{blog.description}</Typography>
        <div className="blog__management-time">
          <Typography>Tạo lúc: {util.time.beautify(blog.createdAt)}</Typography>
          <Typography>Sửa lúc: {util.time.beautify(blog.updatedAt)}</Typography>
        </div>
      </div>
      <div className="blog__management-right">
        {/* <div className='blog__management-statistic'>
            <div className='blog__management-like'>
              <ThumbUpIcon color="primary" />
              <Typography >{blog.likeCount}</Typography>
            </div>
            <div className='blog__management-comment'>
              <MessageIcon color="primary" />
              <Typography >{blog.commentCount}</Typography>
            </div>
            <div className='blog__management-view'>
              <VisibilityIcon color="primary" />
              <Typography >{blog.viewCount}</Typography>
            </div>
          </div> */}
        <div className="blog__management-buttons">
          <Button variant="contained" onClick={onUpdatingBlogContent}>
            Edit
          </Button>
          <Button variant="contained" onClick={onDeleteBlog} color="error">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Blog
