import React from 'react'
import { useNavigate } from 'react-router-dom';
import { beautify } from '../../../../utils/time';
import "./styles.css"

const Blog = (data) => {

    const {_id, name, createdAt, likes, comments, thumbnail} = data.data;
    const navigate = useNavigate();
    const image = thumbnail !== undefined ? `data:image/png;base64, ${Buffer.from(thumbnail.data.data).toString('base64')}` : null;

    const viewBlogDetail = () => {
        navigate(`/blog/${_id}`);
    }

    return (
        <div className="preview-blog-container" onClick={viewBlogDetail}>
            <div className="blog-image-container"><img src={image} alt="blog" className="blog-image" /></div>
            <div className="blog-title">{name}</div>
            <div className="blog-info">
                <div className="blog-create">Created at: {beautify(createdAt)}</div>
                <div className="blog-react">
                    <div>{likes?.length} Likes</div>
                    <div>{comments?.length} Comments</div>
                </div>
            </div>
        </div>
    )
}

export default Blog