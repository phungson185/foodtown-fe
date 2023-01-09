import { COMMENTBLOG, DISLIKEBLOG, GETALLBLOGS, GETBLOG, LIKEBLOG, LOADCOMMENTS } from "../constants/actionTypes"

const blogReducers = (state = {blogs: null, blog: null, commentCount: null}, action) => {
    const updatedBlog = state.blog;
    switch(action.type){
        case GETALLBLOGS: 
            return {...state, blogs: action?.data?.result};
        case GETBLOG:
            return {...state, blog: action?.data?.result?.blog, commentCount: action?.data?.result?.commentCount}
        case LOADCOMMENTS:
            return {...state, blog: {
                ...state.blog,
                comments: state.blog.comments.concat(action?.data?.result)
            }}
        case LIKEBLOG:
            return {...state, blog: {
                ...state.blog,
                likes: action?.data?.result?.likes
            }}
        case DISLIKEBLOG:
            return {...state, blog: {
                ...state.blog,
                likes: action?.data?.result?.likes
            }}
        case COMMENTBLOG:
            const newComments = state.blog.comments;
            newComments.unshift(action?.data?.result?.comment);
            newComments?.length > 3 && newComments.pop();
            return {...state, blog: {
                ...state.blog,
                comments: newComments,
            }, commentCount: parseInt(action?.data?.result?.commentCount)}
        default: return state;
    }
}

export default blogReducers;