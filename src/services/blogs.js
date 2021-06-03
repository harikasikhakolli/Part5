import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (blog, token) => {
  const config = {
    headers: { authorization: `bearer ${token}` }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: { authorization: `bearer ${token}` }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, postBlog, updateBlog, deleteBlog }