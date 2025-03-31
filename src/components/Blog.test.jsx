import { render, screen } from "@testing-library/react"
import Blog from './Blog'
import { expect } from "vitest"

test('renders the blog\'s title and author', () => {
    const blog = {
       title: "Blog 10",
        author: "Mskf",
        url: "url_String77",
        likes: 78 
    }

    const user = {
        username: "testUser",
        name: "Test User"
    }

    render(<Blog blog={blog} user={user}/>)

    expect(screen.getByText(/Blog 10\s+Mskf/i)).toBeDefined()

    expect(screen.queryByText("url_String77", { exact: true, hidden: false })).not.toBeVisible()
    expect(screen.queryByText("78", { exact: true, hidden: false })).not.toBeVisible()

    // screen.debug()

    
})