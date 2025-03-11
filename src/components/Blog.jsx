import { useState } from "react"
// import Togglable from "./Togglable"

const Blog = ({ blog }) => {
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
    setLabel(label === 'view' ? 'hide' : 'view')
  }

   
    {/* <div>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable showButtonLabel={'view'} hideButtonLabel={'hide'} >
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button>like</button>
        </p>
        <p>{blog.user ? blog.user.name : "Unknown user"}</p>
        </Togglable>
    </div> */}
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
          <button>like</button>
        </p>
        <p>{blog.user ? blog.user.name : "Unknown user"}</p>
        
      </div>  

    </div>
  )
}

export default Blog