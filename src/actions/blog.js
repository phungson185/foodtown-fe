import * as api from '../api'
import {
  DISLIKEBLOG,
  GETALLBLOGS,
  GETBLOG,
  LIKEBLOG,
  LOADCOMMENTS,
  COMMENTBLOG,
} from '../constants/actionTypes'

export const getBlogs = (page, filterField, searchingName) => async (dispatch) => {
  try {
    const { data } = await api.getBlogs(page, filterField, searchingName)
    dispatch({ type: GETALLBLOGS, data })
  } catch (error) {
    console.log({ error })
  }
}

export const getBlog = (id) => async (dispatch) => {
  try {
    const { data } = await api.getBlog(id)
    dispatch({ type: GETBLOG, data })
  } catch (error) {
    console.log({ error })
  }
}

export const createBlog = (blogInfo, blogContent, blogThumbnail) => async (dispatch) => {
  const blog = new FormData()
  blog.append('name', blogInfo.name)
  blog.append('description', blogInfo.description)
  blog.append('content', blogContent)
  blog.append('thumbnail', blogThumbnail)
  try {
    const res = await api.createBlog(blog)
    if (res.data.message === 'success') {
      const { data } = await api.getBlogs(1, 'updatedAt', '')
      dispatch({ type: GETALLBLOGS, data })
    }
  } catch (error) {
    console.log({ error })
  }
}

export const updateBlog = (blogInfo, blogContent, blogThumbnail) => async (dispatch) => {
  const blog = new FormData()
  blog.append('id', blogInfo.id)
  blog.append('name', blogInfo.name)
  blog.append('description', blogInfo.description)
  blog.append('content', blogContent)
  blog.append('thumbnail', blogThumbnail)
  try {
    const res = await api.updateBlog(blog)
    if (res.data.message === 'success') {
      const { data } = await api.getBlogs(1, 'updatedAt', '')
      dispatch({ type: GETALLBLOGS, data })
    }
  } catch (error) {
    console.log({ error })
  }
}

export const deleteBlog = (blogId) => async (dispatch) => {
  try {
    const res = await api.deleteBlog(blogId)
    if (res.data.message === 'success') {
      const { data } = await api.getBlogs(1, 'updatedAt', '')
      dispatch({ type: GETALLBLOGS, data })
    }
  } catch (error) {
    console.log({ error })
  }
}

export const likeBlog = (blogId) => async (dispatch) => {
  try {
    const { data } = await api.likeBlog(blogId)
    dispatch({ type: LIKEBLOG, data })
  } catch (error) {
    console.log({ error })
  }
}

export const dislikeBlog = (blogId) => async (dispatch) => {
  try {
    const { data } = await api.dislikeBlog(blogId)
    dispatch({ type: DISLIKEBLOG, data })
  } catch (error) {
    console.log({ error })
  }
}

export const loadCommentBlog = (blogId, page) => async (dispatch) => {
  try {
    const { data } = await api.getCommentBlogs(blogId, page)
    dispatch({ type: LOADCOMMENTS, data })
  } catch (error) {
    console.log({ error })
  }
}

export const commentBlog = (blogId, comment) => async (dispatch) => {
  try {
    const { data } = await api.commentBlog(blogId, comment)
    dispatch({ type: COMMENTBLOG, data })
  } catch (error) {
    console.log({ error })
  }
}
