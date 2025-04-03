
import { useState } from 'react'

const NewBlogForm = ({ handleNewBlogAdd }) => {

  const [newBlogsTitle, setNewBlogsTitle] = useState('')
  const [newBlogsAuthor, setNewBlogsAuthor] = useState('')
  const [newBlogsURL, setNewBlogsURL] = useState('')
  const [newBlogsLikes, setNewBlogsLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    // console.log('hi')

    handleNewBlogAdd({
      'title': newBlogsTitle,
      'author': newBlogsAuthor,
      'url': newBlogsURL,
      'likes': newBlogsLikes
    })

    setNewBlogsTitle('')
    setNewBlogsAuthor('')
    setNewBlogsURL('')
    setNewBlogsLikes('')

  }

  return(
    <div>
      <h3>Add a new Blog</h3>
      <form onSubmit={addBlog} style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        rowGap: '10px',
        columnGap: '10px',
        alignItems: 'center'

      }}>
        <label htmlFor='blogTitle'>Blog title</label>
        <input
          id='blogTitle'
          type='text'
          value={newBlogsTitle}
          name='Blog Title'
          onChange={({ target }) => setNewBlogsTitle(target.value)}
        />

        <label htmlFor='blogAuthor'>Blog Author</label>
        <input
          id='blogAuthor'
          type='text'
          value={newBlogsAuthor}
          name='Blog Author'
          onChange={({ target }) => setNewBlogsAuthor(target.value)}
        />

        <label htmlFor='blogURL'>Blog URL</label>
        <input
          id='blogURL'
          type='text'
          value={newBlogsURL}
          name='Blog URL'
          onChange={({ target }) => setNewBlogsURL(target.value)}
        />

        <label htmlFor='blogLikes'>Blog Likes</label>
        <input
          id='blogLikes'
          type='number'
          value={newBlogsLikes}
          name='Blog Likes'
          onChange={({ target }) => setNewBlogsLikes(Number(target.value))}
        />

        <div></div>
        <button type='submit' id='saveBlog' >Save the Blog</button>

      </form>
    </div>
  )
}

export default NewBlogForm