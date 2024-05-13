import {
  faCircleExclamation,
  faClipboard,
  faFile,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostHeader = ({ post }) => {
  const navigate = useNavigate();

  const gotToPost = () => {
    navigate('/post/' + post.PID, { state: { post: post } });
  };
  return (
    <div
      className='postHeader w-11/12 card shadow-xl p-10 cursor-pointer flex flex-row'
      onClick={gotToPost}>
      <div className='flex justify-center items-center w-3/12'>
        {post.postType === 'assignment' ? (
          <FontAwesomeIcon icon={faFile} size='2x' />
        ) : post.postType === 'test' ? (
          <FontAwesomeIcon icon={faClipboard} size='2x' />
        ) : post.postType === 'material' ? (
          <FontAwesomeIcon icon={faPaperclip} size='2x' />
        ) : (
          <FontAwesomeIcon icon={faCircleExclamation} size='2x' />
        )}
      </div>
      <div className='divider lg:divider-horizontal divider-neutral'></div>
      <div>
        <h1 className='text-md font-medium'>{post.message}</h1>
        <h1>created: {new Date(post.created).toDateString()}</h1>
        {post.due ? <h1>due: {new Date(post.due).toDateString()}</h1> : null}
      </div>
    </div>
  );
};

export default PostHeader;
