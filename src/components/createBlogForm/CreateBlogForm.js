import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useDispatch } from 'react-redux'
import './styles.css'
import { createBlog, updateBlog } from '../../actions/blog'

const CreateBlogForm = ({ cancelCreatingBlog, cleanForm, updatingBlogContent, type }) => {
  const [blogInfo, updateBlogInfo] = useState({
    id: updatingBlogContent._id,
    name: updatingBlogContent.name,
    description: updatingBlogContent.description,
  })
  const [blogContent, updateBlogContent] = useState(updatingBlogContent.content)
  const [blogThumbnail, setBlogThumbnail] = useState(updatingBlogContent.thumbnail)

  const dispatch = useDispatch()

  const onUploadThumbnail = (e) => {
    setBlogThumbnail(e.target.files[0])
  }

  const onModifyBlogContent = (e) => {
    updateBlogInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const onCancelCreatingBlog = () => {
    cleanForm({
      name: '',
      description: '',
      content: '',
      thumbnail: null,
    })
    cancelCreatingBlog(true)
  }

  const onSubmitCreatingBlog = () => {
    dispatch(createBlog(blogInfo, blogContent, blogThumbnail))
    cleanForm({
      name: '',
      description: '',
      content: '',
      thumbnail: null,
    })
    cancelCreatingBlog(true)
  }

  const onSubmitUpdatingBlog = () => {
    dispatch(updateBlog(blogInfo, blogContent, blogThumbnail))
    cleanForm({
      name: '',
      description: '',
      content: '',
      thumbnail: '',
    })
    cancelCreatingBlog(true)
  }

  return (
    <div className="blog__create-form">
      <TextField
        label="Blog Name"
        variant="outlined"
        name="name"
        onChange={onModifyBlogContent}
        value={blogInfo.name}
      />
      <TextField
        label="Blog Description"
        variant="outlined"
        name="description"
        onChange={onModifyBlogContent}
        value={blogInfo.description}
      />
      <CKEditor
        name="content"
        editor={ClassicEditor}
        data={blogContent ? blogContent : '<p>Write some stuff...</p>'}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor.getData()
          updateBlogContent(data)
        }}
      />
      <div className="blog__create-thumbnail">
        <Button variant="contained" component="label">
          Upload Thumbnail
          <input type="file" hidden onChange={onUploadThumbnail} />
        </Button>
        <p>{blogThumbnail ? blogThumbnail.name : 'No uploaded image'}</p>
      </div>
      {/* <img src={updatingBlogContent.thumbnail} alt="" className='fixed-image' /> */}
      <div className="blog__create-buttons">
        <Button variant="outlined" onClick={onCancelCreatingBlog}>
          CANCEL
        </Button>
        <Button
          variant="contained"
          onClick={updatingBlogContent.content ? onSubmitUpdatingBlog : onSubmitCreatingBlog}
        >
          {type}
        </Button>
      </div>
    </div>
  )
}

export default CreateBlogForm
