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

  const compareBlogsLikes = (a, b) => b.likes - a.likes 

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
    
    // console.log(newBlog);
    

    try {
      const savedBlog =  await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      printMessage(`New blog: "${newBlog.title}" by ${newBlog.author} added successfully!`, 'green')
      
    } catch (error) {
      printMessage(error.response.data.error, 'red')
      // console.log('The Error:' , error)
      
    }
    // console.log('adding new blog')    
  }

  const likeTheBlog = async(blog) => {

    const likedBlog = {likes: blog.likes+1}
    // const likedBlog = {...blog, likes: blog.likes+1, user: blog.user.id}
    try {
      const changedBlog = await blogService.change(blog.id, likedBlog)
      // console.log('THE liked blog: \n', likedBlog)
      // setBlogs(blogs.map(b => b.id === blog.id ? { ...b, likes: changedBlog.likes } : b))
      let updatedBlogs = blogs.map(b => b.id === blog.id ? changedBlog: b)
      setBlogs(updatedBlogs.sort(compareBlogsLikes))
      
    } catch (error) {
      printMessage(error.response.data.error, 'red')
      // console.log('The Error:' , error)
    }

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
        <Togglable buttonLabel={'new note'} >
          <NewBlogForm handleNewBlogAdd={handleNewBlogAdd} />
        </Togglable>
      </div>
      <h2>blogs</h2>  

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeTheBlog={likeTheBlog} />
      )}
    </div>
  )


  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll() 
      blogs.sort(compareBlogsLikes)
      setBlogs( blogs )
      
    } catch (error) {
      printMessage(error.response.data.error, 'red')

    }
  }
  
  useEffect(() => {
    // async function fetchBlogs() {
    //   try {
    //     const blogs = await blogService.getAll() 
    //     blogs.sort(compareBlogsLikes)
    //     setBlogs( blogs )
        
    //   } catch (error) {
    //     printMessage(error.response.data.error, 'red')

    //   }
    // }

    fetchBlogs()
      
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