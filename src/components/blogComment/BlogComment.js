import React from 'react'
import Avatar from '@mui/material/Avatar';
import './styles.css'

const BlogComment = ({comment}) => {
  return (
    <div className='blog__comment-container'>
        <Avatar>{comment?.user.lastName[0]}</Avatar>
        <div>
            <div>{comment?.user.firstName} {comment?.user.lastName}</div>
            <div>{comment?.content}</div>
        </div>
    </div>
  )
}

export default BlogComment