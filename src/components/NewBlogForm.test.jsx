import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
// import { describe } from "vitest"

describe('<NewBlogForm />', () => {
  test('form calls the event handler it received as props with the right details', async () => {
    const handleNewBlogAdd = vi.fn()
    const { container } = render(<NewBlogForm handleNewBlogAdd={handleNewBlogAdd} />)

    const blogTitleInput = container.querySelector('#blogTitle')
    const blogAuthorInput = container.querySelector('#blogAuthor')
    const blogURLInput = container.querySelector('#blogURL')
    const blogLikesInput = container.querySelector('#blogLikes')

    const saveBlogButton = container.querySelector('#saveBlog')

    const user = userEvent.setup()

    await user.type(blogTitleInput, 'Test Blog Title')
    await user.type(blogAuthorInput, 'Test Blog Author')
    await user.type(blogURLInput, 'Test Blog URL')
    await user.type(blogLikesInput, '10')

    await user.click(saveBlogButton)

    expect(handleNewBlogAdd.mock.calls).toHaveLength(1)

    expect(handleNewBlogAdd).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      author: 'Test Blog Author',
      url: 'Test Blog URL',
      likes: 10,
    })

    expect(handleNewBlogAdd.mock.calls[0][0].title).toBe('Test Blog Title')
    expect(handleNewBlogAdd.mock.calls[0][0].author).toBe('Test Blog Author')
    expect(handleNewBlogAdd.mock.calls[0][0].url).toBe('Test Blog URL')
    expect(handleNewBlogAdd.mock.calls[0][0].likes).toBe(10)

  })
})