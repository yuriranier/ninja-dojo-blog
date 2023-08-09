import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setIsPending(true);
    fetch('http://localhost:8000/blogs', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(blog) }).then(() => {
      console.log('blog added!');
      setIsPending(false);
      history.push('/ninja-dojo-blog/');
    });
  };
  return (
    <div className='create'>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input type='text' required value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Blog Author:</label>
        <select required value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value='' disabled defaultValue>
            Select an author
          </option>
          <option value='mario'>Mario</option>
          <option value='yoshi'>Yoshi</option>
        </select>
        <label>Blog Body:</label>
        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
      {(title || body || author) && (
        <div className='preview'>
          <fieldset>
            <legend>
              <h4>Preview</h4>
            </legend>
            <h2>{title}</h2>
            {author && <p className='prev-author'>Writen by: {author}</p>}
            <p className='prev-body'>{body}</p>
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default Create;
