import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { getPost } from '../../helper/API';
const PostSettings = () => {
  const { PID } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(useLocation().state.post);
  const { user } = useContext(UserContext);
  const [inputValue, setInputValue] = useState({
    postType: post.postType,
    message: post.message,
    content: post.content,
    due: post.due,
    attachments: post.attachments,
  });

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const syncPost = async () => {
      const res = await getPost(PID);
      if (!post) {
        if (res) {
          setPost(res);
        }
      } else {
        if (res !== post) {
          setPost(res);
        }
      }
    };
    syncPost();
  }, [PID]);
  return (
    <>
      <form
        action=''
        className='ml-auto mt-auto flex flex-col justify-center justify-items-center'>
        <div>
          <label htmlFor='postType'>Post Type</label>
          <select name='postType' id='postType' onChange={handleChange}>
            <option value='announcement'>Announcement</option>
            <option value='material'>Material</option>
            <option value='assignment'>Assignment</option>
            <option value='test'>Test</option>
          </select>
        </div>
        <div>
          <label htmlFor='message'>Message</label>
          <input
            name='message'
            id='message'
            type='text'
            value={inputValue.message}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='content'>Content</label>
          <input
            name='content'
            id='content'
            type='text'
            value={inputValue.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='due'>Due Date</label>
          <input
            name='due'
            id='due'
            type='date'
            value={
              inputValue.due
                ? new Date(inputValue.due).toISOString().split('T')[0]
                : ''
            }
            onChange={handleChange}
          />
        </div>
        {/* <div><label htmlFor=""></label><input name='' id='' type="file" /></div> */}
        <div>
          <label htmlFor='lateSubmit'>
            Allow students to submit after due time:{' '}
          </label>
          <input
            id='lateSubmit'
            name='lateSubmit'
            type='checkbox'
            value={true}
          />
        </div>
      </form>
    </>
  );
};

export default PostSettings;
