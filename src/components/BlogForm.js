import React, { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl, setUrl] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()

    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleCreation} className="blogForm" >
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={blogTitle}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            name="author"
            value={blogAuthor}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            id="url"
            type="url"
            name="url"
            value={blogUrl}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-blog" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateBlog