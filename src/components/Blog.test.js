import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Individual blog tests', () => {
  let component
  let updateBlog = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Test blog',
      author: 'Jest Mirad',
      url: 'www.com',
      likes: 42,
      user: { username: 'td', name: 'Test Developer' }
    }
    component = render(
      <Blog blog={blog} updateBlog={updateBlog} />
    )
  })

  test('blog renders title and author but not url or likes by default', () => {
    const div = component.container.querySelector('.details')

    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('Jest Mirad')
    expect(div).toHaveStyle('display: none')
  })

  test('details shown when show button clicked', () => {
    const showButton = component.getByText('show')

    fireEvent.click(showButton)
    const div = component.container.querySelector('.details')

    expect(div).not.toHaveStyle('display: none')
  })

  test('if like clicked twice, like handler called twice', () => {
    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})

describe('form tests', () => {
  test('onSubmit form is fired with right inputs', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    const submittedBlog = {
      title: 'Created by Jest',
      author: 'Jest Mirad',
      url: 'www.http.com'
    }

    fireEvent.change(titleInput, {
      target: { value: 'Created by Jest' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'Jest Mirad' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'www.http.com' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(submittedBlog)
  })
})