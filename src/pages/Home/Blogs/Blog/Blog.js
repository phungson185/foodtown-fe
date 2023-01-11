import React from 'react'
import { useNavigate } from 'react-router-dom';
import { beautify } from '../../../../utils/time';
import "./styles.css"

const Blog = (data) => {

    const {_id, name, createdAt, likes, comments, thumbnail} = data.data;
    const navigate = useNavigate();
    const viewBlogDetail = () => {
        navigate(`/blog/${_id}`);
    }

    return (
        <div className="preview-blog-container" onClick={viewBlogDetail}>
            <div className="blog-image-container"><img src={thumbnail} alt="blog" className="blog-image" /></div>
            <div className="blog-title">{name}</div>
            <div className="blog-info">
                <div className="blog-create">Đăng vào: {beautify(createdAt)}</div>
                <div className="blog-react">
                    <div>{likes?.length} Likes</div>
                    <div>{comments?.length} Comments</div>
                </div>
            </div>
        </div>
    )
}

export default Blog