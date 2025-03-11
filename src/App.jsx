import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [newBlogsTitle, setNewBlogsTitle] = useState('')
  // const [newBlogsAuthor, setNewBlogsAuthor] = useState('')
  // const [newBlogsURL, setNewBlogsURL] = useState('')
  // const [newBlogsLikes, setNewBlogsLikes] = useState('')

  const [message, setMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  // const [blogAddVisible, setBlogAddVisible] = useState(false)

  const printMessage = (message, color) => {
    setNotificationColor(color)
    setMessage(message)

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogListAppUser', JSON.stringify(loggedInUser)
      )
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      console.log('Wrong Credentials', exeption)      
    }
    console.log('loging in with ', username, password)
    
  }

  const handleNewBlogAdd = async (newBlog) => {
    // event.preventDefault()
    // const newBlog = {         
    //   "title": newBlogsTitle,
    //   "author": newBlogsAuthor,
    //   "url": newBlogsURL,
    //   "likes": newBlogsLikes, 
    // }

    console.log(newBlog);
    

    try {
      const savedBlog =  await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      printMessage(`New blog: "${newBlog.title}" by ${newBlog.author} added successfully!`, 'green')
      // setNewBlogsTitle('')
      // setNewBlogsAuthor('')
      // setNewBlogsURL('')
      // setNewBlogsLikes('')
    } catch (error) {
      printMessage(error.response.data.error, 'red')
      console.log('The Error:' , error)
      
    }
    // console.log('adding new blog')    
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username&nbsp;
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
              autoComplete='off'
              />
        </div>
        <div>
          password&nbsp;
            <input
              type='text'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
              autoComplete='off'
              />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h3 className='user'>{user.name} is logged in&nbsp;
        <button type='button' onClick={() => {
          window.localStorage.removeItem('loggedBlogListAppUser')
          setUser(null)
        }}>logout</button>
      </h3>
      <div>
        <Togglable buttonLabel={'new note'}>
          <NewBlogForm handleNewBlogAdd={handleNewBlogAdd} />
        </Togglable>
      </div>
      <h2>blogs</h2>  

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  // const newBlogForm = () => {
  //   return (
  //     <Togglable buttonLabel={'new note'}>
  //       <NewBlogForm handleNewBlogAdd={handleNewBlogAdd} />
  //     </Togglable>
  //   )
  // //   const hideWhenVisible = { display: blogAddVisible ? 'none' : '' }
  // //   const showWhenVisible = { display: blogAddVisible ? '' : 'none' }
  // //   return(
  // //     <div>
  // //       <div style={hideWhenVisible}>
  // //         <button onClick={() => setBlogAddVisible(true)}>new note</button>
  // //       </div>
      
  // //       <div style={showWhenVisible}>
  // //         <h3>Add a new Blog</h3>
  // //         <form onSubmit={handleNewBlogAdd} style={{
  // //           display: 'grid',
  // //           gridTemplateColumns: '120px 1fr',
  // //           rowGap: '10px',
  // //           columnGap: '10px',
  // //           alignItems: 'center'

  // //         }}>
  // //           <label htmlFor='blogTitle'>Blog title</label>          
  // //           <input
  // //             id='blogTitle'
  // //             type='text'
  // //             value={newBlogsTitle}
  // //             name='Blog Title'
  // //             onChange={({ target }) => setNewBlogsTitle(target.value)}
  // //           />
            
  // //           <label htmlFor='blogAuthor'>Blog Author</label>          
  // //           <input
  // //             id='blogAuthor'
  // //             type='text'
  // //             value={newBlogsAuthor}
  // //             name='Blog Author'
  // //             onChange={({ target }) => setNewBlogsAuthor(target.value)}
  // //           />

  // //           <label htmlFor='blogURL'>Blog URL</label>          
  // //           <input
  // //             id='blogURL'
  // //             type='text'
  // //             value={newBlogsURL}
  // //             name='Blog URL'
  // //             onChange={({ target }) => setNewBlogsURL(target.value)}
  // //           />

  // //           <label htmlFor='blogLikes'>Blog Likes</label>          
  // //           <input
  // //             id='blogLikes'
  // //             type='number'
  // //             value={newBlogsLikes}
  // //             name='Blog Likes'
  // //             onChange={({ target }) => setNewBlogsLikes(target.value)}
  // //           /> 

  // //           <div></div>
  // //           <button type='submit'>Save the Blog</button>
            
  // //         </form>
  // //         <button onClick={() => setBlogAddVisible(false)}>cancel</button>
  // //       </div>

          
  // //     </div>
  // //   )
        
  // }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      setUser(user)
    }
  }, [])



  return (
    <div>
      <Notification message={message} notificationColor={notificationColor}/>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App