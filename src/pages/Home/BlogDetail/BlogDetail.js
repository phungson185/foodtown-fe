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
                        <p>{blog?.viewCount} viewed</p>
                    </div>
                    <div className='blog__statistic-right'>
                        <p>{blog?.likes?.length} liked</p>
                        <p>{commentCount} comment</p>
                    </div>
                </div>
                <div className='blog__react-container'>
                    <div className='blog__react-item' onClick={isLiked ? onDislike : onLike}>
                        {
                            isLiked ?
                            <>
                                <ThumbUpIcon />
                                <p>Unliked</p>
                            </>
                            :
                            <>
                                <ThumbUpOffAltIcon />
                                <p>Liked</p>
                            </>
                        }
                    </div>
                    <div className='blog__react-item'>
                        <ChatBubbleOutlineIcon />
                        <p>Comment</p>
                    </div>
                    <div className='blog__react-item' onClick={onShareBlog}>
                        <RiShareForwardLine size="1.75rem" />
                        <p>Shared</p>
                    </div>
                </div>
                <div>
                    <div className='blog__detail__comment-container'>
                        <TextField
                            id="outlined-textarea"
                            placeholder="Let Food Town know what you think..."
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            size={'small'}
                            fullWidth
                        />
                        <div>
                            <Button variant="contained" className='blog__detail__comment-button' onClick={onSubmitComment}>Submit</Button>
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
                                    <p>Be the first comment</p>
                                    :
                                    <p className='blog_detail__comment-load' onClick={showLessComments}>Hide</p>
                                )
                                :
                                <p className='blog_detail__comment-load' onClick={loadNextComments}>Read more</p>
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
                        <div>The Food Town project is part of the Vietnam Social Challenger Accelerator Program Sunny: The Change We Make (VSCS 2022) organized by Sunny Vietnam and the Institute for Innovation and Development (IID), Sponsored by The Happiness Foundation.</div>
                        <div>----------------------------</div>
                        <div>For more information, please contact:</div>
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