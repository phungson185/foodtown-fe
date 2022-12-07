import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../../actions/blog'
import { MdSearchOff } from 'react-icons/md'
import { COMMENT, CREATE, LIKE, UPDATE, VIEW } from '../../../constants/filterMode'
import Button from '@mui/material/Button'
import CreateBlogForm from '../../../components/createBlogForm/CreateBlogForm'
import Blog from './Blog/Blog'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import './styles.css'

const Blogs = () => {
  const [updatingBlogContent, setUpdatingBlogContent] = useState({
    name: '',
    description: '',
    content: '',
    thumbnail: null,
  })
  const [isViewingBlogs, setIsViewingBlogs] = useState(true)
  const [page, setPage] = useState(1)
  const [searchingName, setSearchingName] = useState('')
  const [filterField, setFilterField] = useState(UPDATE)
  const blogs = useSelector((state) => state.blog.blogs)
  const dispatch = useDispatch()

  const onCreateBlog = () => {
    setIsViewingBlogs(false)
  }

  useEffect(() => {
    dispatch(getBlogs(page, filterField, searchingName))
  }, [dispatch, page, filterField, searchingName])

  return (
    <div>
      {isViewingBlogs ? (
        <div className="blogs__management-container">
          <div className="blogs_management-header">
            <div className="blogs_management-filters">
              <TextField
                label="Search Blog..."
                variant="outlined"
                size="small"
                value={searchingName}
                onChange={(e) => setSearchingName(e.target.value)}
                fullWidth
              />
              <Box sx={{ width: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="orderBy">Order By</InputLabel>
                  <Select
                    value={filterField}
                    id="orderBy"
                    label="Order By"
                    onChange={(e) => setFilterField(e.target.value)}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value={UPDATE}>Update</MenuItem>
                    <MenuItem value={CREATE}>Create</MenuItem>
                    <MenuItem value={LIKE}>Likes</MenuItem>
                    <MenuItem value={COMMENT}>Comments</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <Button variant="contained" onClick={onCreateBlog}>
              Create Blog
            </Button>
          </div>
          {!blogs?.length ? (
            <div className="not__found-container">
              <MdSearchOff size="240px" />
              <Typography fontSize={36}>No blogs are found</Typography>
            </div>
          ) : (
            <>
              <div className="blogs__management-list">
                {blogs?.map((blog) => (
                  <Blog
                    blog={blog}
                    updatingBlog={setIsViewingBlogs}
                    updatingBlogContent={setUpdatingBlogContent}
                  />
                ))}
              </div>
              <div className="blogs__management-pagination">
                <Pagination
                  count={10}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  showFirstButton
                  showLastButton
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <CreateBlogForm
          cancelCreatingBlog={setIsViewingBlogs}
          cleanForm={setUpdatingBlogContent}
          updatingBlogContent={updatingBlogContent}
        />
      )}
    </div>
  )
}

export default Blogs
