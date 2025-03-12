import { useState } from "react"
// import blogService from "../services/blogs"
// import Togglable from "./Togglable"

const Blog = ({ blog, likeTheBlog }) => {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('view')

  // const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
    setLabel(!visible ? 'hide' : 'view')
  }

  const handleLikeTheBlog = async() => {
    likeTheBlog(blog)
  }

   
  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{label}</button>
      </div>  
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleLikeTheBlog}>like</button>
        </p>
        <p>{blog.user ? blog.user.name : "Unknown user"}</p>
        
      </div>  

    </div>
  )
}

export default Blog