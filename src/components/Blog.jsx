import { useState } from 'react'
import PropTypes from 'prop-types'
// import blogService from "../services/blogs"
// import Togglable from "./Togglable"

const Blog = ({ blog, likeTheBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('view')

  // const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none' }
  const ownerUsername = blog.user ? blog.user.username : null
  const isOwner = user.username === ownerUsername

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: '#2959ab',
    // color: 'black',
    border: 'none',
    padding: '3px 10px',
    cursor: 'pointer',
    borderRadius: '5px'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    setLabel(!visible ? 'hide' : 'view')
  }

  const handleLikeTheBlog = async() => {
    likeTheBlog(blog)
  }

  const handleRemove = async() => {
    removeBlog(blog)
    // console.log('clicked')
  }


  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleLikeTheBlog}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : 'Unknown user'}</div>
        <p>{isOwner && <button onClick={handleRemove} style={removeButtonStyle}>remove</button>}</p>


      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  likeTheBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default Blog