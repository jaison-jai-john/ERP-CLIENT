import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '../../components/LoadingButton';

const EditPost = () => {
  const post = useLocation().state.post;
  const [inputValue, setInputValue] = useState({
    PID: post.PID,
    postType: post.postType,
    message: post.message,
    content: post.content,
    due: post.due,
    attachments: post.attachments ? post.attachments : '',
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const req = axios
      .patch(`https://erp-server-3a3q.onrender.com/post/${post.PID}`, {
        postType: inputValue.postType,
        message: inputValue.message,
        content: inputValue.content,
        due: inputValue.due,
      })
      .then((res) => {
        setUploading(false);
        if (res.status === 200) {
          navigate(`/post/${post.PID}`);
        }
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <form className='w-full h-full flex p-20' onSubmit={handleSubmit}>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className='font-bold text-xl text-bgsecondary'>Edit Post</h1>
        <div className='form-control w-1/4 flex items-start'>
          <label htmlFor='postType' className='label gap-4'>
            <span className='label-text text-bgsecondary'>Post Type: </span>
            <select
              name='postType'
              id='postType'
              className='select bg-bgprimary text-bgsecondary input-bordered'
              onChange={handleChange}
              value={inputValue.postType}>
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
              value={inputValue.message}
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
              value={inputValue.content}
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
              value={new Date(inputValue.due).toISOString().split('T')[0]}
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
              value={inputValue.attachments}
              onChange={handleChange}
              className='bg-bgprimary text-bgsecondary w-full mt-3'
              multiple
            />
          </label>
        </div>
        <div className='w-1/4 flex justify-center items-center'>
          <LoadingButton
            text={'Update Post'}
            enabled={true}
            loading={uploading}></LoadingButton>
        </div>
      </div>
    </form>
  );
};

export default EditPost;
