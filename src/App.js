import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    setUser(JSON.parse(user))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage({
        text: 'Username or password invalid',
        type: 'error'
      })
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const createBlog = async blog => {
    blogFormRef.current.toggleVisibility()

    const token = user.token

    await blogService.postBlog(blog, token)
    setBlogs(await blogService.getAll())
    setMessage({
      text: 'Blog created successfully',
      type: 'success'
    })
    setTimeout(() => setMessage(null), 5000)
  }

  const incrLikes = blog => {
    setBlogs(blogs.map(
      b => {
        if (b.id === blog.id) b.likes++
        return b
      }
    ))
    blogService.updateBlog(blog)
  }

  const deleteBlog = async (blog) => {
    console.log('hai')
    await blogService.deleteBlog(blog.id, user.token)
    setBlogs(await blogService.getAll())
  }

  if (user === null) {
    return (
      <div>
        <Notification
          message={message}
        />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
        <br />

        <Notification
          message={message}
        />

        <Togglable buttonText='Create Blog' ref={blogFormRef}>
          <h2>Create new Blog</h2>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>

        {blogs.sort(
          (a, b) => b.likes - a.likes
        ).map(blog =>
          <Blog key={blog.id} user={user} blog={blog} updateBlog={incrLikes} deleteBlog={deleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App