import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { exact } from 'prop-types'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
// import { expect } from 'vitest'

test('renders the blog\'s title and author', async () => {
  const blog = {
    title: 'Blog 10',
    author: 'Mskf',
    url: 'url_String77',
    likes: 78
  }

  const blogsUser = {
    username: 'testUser',
    name: 'Test User'
  }

  const likeTheBlog = vi.fn()
  const removeBlog = vi.fn()


  const user = userEvent.setup()
   
  
  const { container } = render(<Blog
        blog={blog}
        user={blogsUser}
        likeTheBlog={likeTheBlog}
        removeBlog={removeBlog}
    />)
    const div = container.querySelector('.blog')
    // const button = screen.getByText('view')
    const viewButton = screen.getByTestId('view')

  expect(div).toHaveTextContent('Blog 10')
  expect(div).toHaveTextContent('Mskf')
  // console.log(div);

  //   expect(div).not.toHaveTextContent('url_String77', { exact: true, hidden: false })

  //   expect(screen.getByText(/Blog 10\s+Mskf/i)).toBeDefined()

  expect(screen.queryByText('url_String77')).not.toBeVisible()
  expect(screen.queryByText('78')).not.toBeVisible()
  
  await user.click(viewButton)
  expect(screen.queryByText('url_String77')).toBeVisible()
  expect(screen.queryByText('78')).toBeVisible()

  const likeButton = screen.getByTestId('like')

  for (let i = 0; i < 2; i++) {
    await user.click(likeButton)
  }

  expect(likeTheBlog.mock.calls).toHaveLength(2)

//   expect()

  // screen.debug()


})