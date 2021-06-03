import React, { useState } from 'react'

const styles = {
  borderStyle: 'solid',
  borderWidth: '1px',
  margin: '5px',
  padding: '2px'
}

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [detailedView, setDetailedView] = useState(false)

  const handleLike = async () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlog(newBlog)
  }

  const handleDelete = () => {
    return window.confirm(`Are you sure you want to remove blog: ${blog.title} by ${blog.author} ?`)
      ? deleteBlog(blog)
      : null
  }

  return (
    <div className="blog" style={styles} >
      <div>
        {blog.title} {blog.author}{' '}
        <button id="show-details-button" onClick={() => setDetailedView(!detailedView)}>{detailedView ? 'hide' : 'show'}</button>
      </div>
      <div className="details" style={{ display: detailedView ? '' : 'none' }}>
        <p>{blog.url}</p>
        <p id="likes">{blog.likes} <button className="likeButton" onClick={handleLike}>like</button></p>
        <p>{blog.user.name}</p>
        {blog.user.username === user.username &&
          <button onClick={handleDelete}>remove</button>}
      </div>
    </div>
  )
}

export default Blog