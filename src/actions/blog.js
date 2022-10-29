import * as api from "../api";
import { DISLIKEBLOG, GETALLBLOGS, GETBLOG, LIKEBLOG, LOADCOMMENTS, COMMENTBLOG } from "../constants/actionTypes";

export const getBlogs = (page, filterField, searchingName) => async (dispatch) => {
    try {
        const {data} = await api.getBlogs(page, filterField, searchingName);
        dispatch({type: GETALLBLOGS, data})
    } catch (error) {
        console.log({error});
    }
}

export const getBlog = (id) => async (dispatch) => {
    try {
        const {data} = await api.getBlog(id);
        dispatch({ type: GETBLOG, data });
    } catch (error) {
        console.log({error});
    }
}

export const createBlog = (blogInfo, blogContent, blogThumbnail) => async (dispatch) => {
    const blog = new FormData();
    blog.append('name', blogInfo.name);
    blog.append('description', blogInfo.description);
    blog.append('content', blogContent);
    blog.append('thumbnail', blogThumbnail);
    try {
        const {data} = await api.createBlog(blog);
        // dispatch()
        console.log(data);
    } catch (error) {
        console.log({error});
    }
}

export const updateBlog = (blogInfo, blogContent, blogThumbnail) => async (dispatch) => {
    const blog = new FormData();
    blog.append('id', blogInfo.id);
    blog.append('name', blogInfo.name);
    blog.append('description', blogInfo.description);
    blog.append('content', blogContent);
    blog.append('thumbnail', blogThumbnail);
    try {
        const {data} = await api.updateBlog(blog);
        // dispatch()
        console.log(data);
    } catch (error) {
        console.log({error});
    }
}

export const deleteBlog = (blogId) => async (dispatch) => {
    try {
        const {data} = await api.deleteBlog(blogId);
        console.log({data});
    } catch (error) {
        console.log({error});
    }
}

export const likeBlog = (blogId) => async (dispatch) => {
    try {
        const {data} = await api.likeBlog(blogId);
        dispatch({ type: LIKEBLOG, data })
    } catch (error) {
        console.log({error});
    }
}

export const dislikeBlog = (blogId) => async (dispatch) => {
    try {
        const {data} = await api.dislikeBlog(blogId);
        dispatch({ type: DISLIKEBLOG, data })
    } catch (error) {
        console.log({error});
    }
}

export const loadCommentBlog = (blogId, page) => async (dispatch) => {
    console.log(page);
    try {
        const {data} = await api.getCommentBlogs(blogId, page);
        console.log(page);
        console.log(data);
        dispatch({ type: LOADCOMMENTS, data })
    } catch (error) {
        console.log({error});
    }
}

export const commentBlog = (blogId, comment) => async (dispatch) => {
    try {
        const {data} = await api.commentBlog(blogId, comment);
        console.log(data);
        dispatch({ type: COMMENTBLOG, data })
    } catch (error) {
        console.log({error});
    }
}