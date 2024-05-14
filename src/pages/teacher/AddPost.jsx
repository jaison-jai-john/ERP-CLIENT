import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '../../components/LoadingButton';

const AddPost = () => {
  const navigate = useNavigate();
  const uploading = useState(false);
  const { CID, message } = useLocation().state;
  const [post, setPost] = useState({
    CID: CID,
    postType: 'announcement',
    message: message,
    content: '',
    due: '',
    attachments: [],
  });

  const addpost = async (e) => {
    e.preventDefault();
    const req = await axios.post('https://erp-server-3a3q.onrender.com/post/', {
      postType: post.postType,
      message: post.message,
      content: post.content,
      due: post.due,
      CID: post.CID,
      attachments: '',
    });
    if (req.status === 201) {
      navigate(`/class/${CID}`);
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <form className='w-full h-full flex p-20' onSubmit={addpost}>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className='font-bold text-xl text-bgsecondary'>Add Post</h1>
        <div className='form-control w-1/4 flex items-start'>
          <label htmlFor='postType' className='label gap-4'>
            <span className='label-text text-bgsecondary'>Post Type: </span>
            <select
              name='postType'
              id='postType'
              className='select bg-bgprimary text-bgsecondary input-bordered'
              onChange={handleChange}
              value={post.postType}>
              <option value='announcement'>Announcement</option>
              <option value='test'>Test</option>
              <option value='material'>Material</option>
              <option value='assignment'>Assignment</option>
            </select>
          </label>
        </div>
        <div className='form-control w-1/4 flex items-start'>
          <label htmlFor='message' className='label gap-4'>
            <span className='label-text text-bgsecondary'>Message: </span>
            <textarea
              name='message'
              id='message'
              type='text'
              value={post.message}
              onChange={handleChange}
              className='textarea textarea-bordered bg-bgprimary text-bgsecondary textarea-lg text-sm w-full'
            />
          </label>
        </div>
        <div className='form-control w-1/4 flex items-start'>
          <label htmlFor='content' className='label gap-4'>
            <span className='label-text text-bgsecondary'>Content: </span>
            <textarea
              name='content'
              id='content'
              type='text'
              value={post.content}
              onChange={handleChange}
              className='textarea textarea-bordered bg-bgprimary text-bgsecondary textarea-lg text-sm w-full'
            />
          </label>
        </div>
        <div className='form-control w-1/4 flex items-start'>
          <label htmlFor='due' className='label gap-4'>
            <span className='label-text text-bgsecondary'>Due: </span>
            <input
              name='due'
              id='due'
              type='date'
              value={post.due}
              onChange={handleChange}
              className='bg-bgprimary text-bgsecondary w-full mt-3 border'
            />
          </label>
        </div>
        <div className='form-control w-1/4 flex items-start'>
          <label
            htmlFor='attachments'
            className='label flex flex-col items-start'>
            <span className='label-text text-bgsecondary'>Attachments: </span>
            <input
              name='attachments'
              id='attachments'
              type='file'
              value={post.attachments}
              onChange={handleChange}
              className='bg-bgprimary text-bgsecondary w-full mt-3'
              multiple
            />
          </label>
        </div>
        <div className='w-1/4 flex justify-center items-center'>
          <LoadingButton
            text={'Add Post'}
            enabled={true}
            loading={!uploading}></LoadingButton>
        </div>
      </div>
    </form>
  );
};

export default AddPost;
