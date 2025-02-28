import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const logedInUser = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogListAppUser', JSON.stringify(logedInUser)
      )
      setUser(logedInUser)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      console.log('Wrong Credentials')      
    }
    console.log('loging in with ', username, password)
    
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
      <h3>{user.name} is loged in&nbsp;
        <button type='button' onClick={() => {
          window.localStorage.removeItem('loggedBlogListAppUser')
          setUser(null)
        }}>logout</button>
      </h3>
      <h2>blogs</h2>  

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const logedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (logedUserJSON) {
      const user = JSON.parse(logedUserJSON)
      setUser(user)
    }
  }, [])



  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App