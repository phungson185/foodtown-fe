import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../../actions/blog'
import Blog from './Blog/Blog'
import "./styles.css"

const Blogs = () => {

  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog.blogs);

  useEffect(() => {
    dispatch(getBlogs(1, 'createdAt', ''));
  }, [])

  return (
    <div className='blogs-container container' id='blogs'>
      <p className='blogs-title'>Some posts of Foodtown</p>
      <div className='blog-container'>
          {
            blogs?.map((item, i) => <Blog key={i} data={item}/>)
          }
      </div>  
    </div>
  )
}

export default Blogs