import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getBlog, likeBlog, dislikeBlog, loadCommentBlog, commentBlog } from '../../../actions/blog';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { RiShareForwardLine } from 'react-icons/ri';
import htmlParser from 'html-react-parser';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./styles.css"
import BlogComment from '../../../components/blogComment/BlogComment';

const BlogDetail = ({user}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const blog = useSelector(state => state.blog.blog);
    const commentCount = useSelector(state => state.blog.commentCount);
    const image = blog?.thumbnail !== undefined ? `data:image/png;base64, ${Buffer.from(blog?.thumbnail?.data).toString('base64')}` : null;
    const isLiked = blog?.likes?.find(like => like.user === user?._id) ? true : false;
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(getBlog(id))
    }, [])

    const onLike = () => {
        if (!user) {
            navigate('/auth');
        } else {
            dispatch(likeBlog(blog?._id));
        }
    }

    const onDislike = () => {
        dispatch(dislikeBlog(blog?._id));
    }

    const onSubmitComment = () => {
        dispatch(commentBlog(blog?._id, comment));
    }

    const onShareBlog = () => {
        navigator.clipboard.writeText(window.location.href);
    }

    const loadNextComments = () => {
        const maxLoad = commentCount;
        const currentLoad = blog?.comments?.length;
        if (currentLoad === maxLoad) return;
        const nextPage = currentLoad / 3;
        dispatch(loadCommentBlog(blog._id, nextPage));
    }

    const showLessComments = () => {
        dispatch(commentBlog());
    }

    return (
        <div className='blog__detail-container wrapper'>
            <div>            
                <div className='blog__detail-thumbnail-container'>
                    <img className='blog__detail-thumbnail' src={image} alt="" />
                </div>
                <div className='blog__statistic-container'>
                    <div className='blog__statistic-left'>
                        <p>{blog?.viewCount} người đã xem</p>
                    </div>
                    <div className='blog__statistic-right'>
                        <p>{blog?.likes?.length} thích</p>
                        <p>{commentCount} bình luận</p>
                    </div>
                </div>
                <div className='blog__react-container'>
                    <div className='blog__react-item' onClick={isLiked ? onDislike : onLike}>
                        {
                            isLiked ?
                            <>
                                <ThumbUpIcon />
                                <p>Bỏ thích</p>
                            </>
                            :
                            <>
                                <ThumbUpOffAltIcon />
                                <p>Thích</p>
                            </>
                        }
                    </div>
                    <div className='blog__react-item'>
                        <ChatBubbleOutlineIcon />
                        <p>Bình luận</p>
                    </div>
                    <div className='blog__react-item' onClick={onShareBlog}>
                        <RiShareForwardLine size="1.75rem" />
                        <p>Chia sẻ</p>
                    </div>
                </div>
                <div>
                    <div className='blog__detail__comment-container'>
                        <TextField
                            id="outlined-textarea"
                            placeholder="Hãy cho Food Town biết suy nghĩ của bạn..."
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            size={'small'}
                            fullWidth
                        />
                        <div>
                            <Button variant="contained" className='blog__detail__comment-button' onClick={onSubmitComment}>Gửi</Button>
                        </div>
                    </div>
                    <div className='blog__detail__comment-list'>
                        {
                            blog?.comments?.length ? 
                            <>
                                {blog?.comments.map(comment => <BlogComment comment={comment} />)}
                            </>
                            :
                            <></>
                        }
                        <div className='blog_detail__comment-statistic'>
                            {
                                commentCount === blog?.comments?.length ?
                                (
                                    commentCount === 0 ?
                                    <p>Hãy là người đầu tiên bình luận</p>
                                    :
                                    <p className='blog_detail__comment-load' onClick={showLessComments}>Ẩn bớt</p>
                                )
                                :
                                <p className='blog_detail__comment-load' onClick={loadNextComments}>Đọc thêm bình luận</p>
                            }
                            <p>{blog?.comments?.length}/{commentCount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='blog__detail__name-container'>
                    <div className='blog__detail__name-content'>
                        <p>{blog?.name}</p>
                    </div>
                    <br></br>
                </div>
                <div className='blog__detail__content-container'>
                    <div>
                        {blog?.content ? htmlParser(blog?.content) : null}
                    </div>
                    <br></br>
                    <hr></hr>
                    <div>
                        <div>Dự án Food Town nằm trong Chương trình Tăng tốc Khởi nghiệp Xã hội Vietnam Social Challenger Sunny: The Change We Make (VSCS 2022) được tổ chức bởi Sunny Việt Nam và Viện Nghiên cứu Đổi mới và Phát triển (IID), tài trợ bởi Quỹ The Happiness Foundation.</div>
                        <div>----------------------------</div>
                        <div>Mọi thông tin chi tiết xin liên hệ:</div>
                        <div>Email: foodtown2022@gmail.com</div>
                        <div>Facebook: Food Town</div>
                        <div>Instagram: instagram.com/foodtown.project</div>
                        <div>Phone number: (+84) 389 669 553</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetail