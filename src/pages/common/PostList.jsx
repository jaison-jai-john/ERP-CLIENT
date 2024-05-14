import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingButton from '../../components/LoadingButton';
import LoadingCircle from '../../components/LoadingCircle';
import PostHeader from '../../components/PostHeader';

const PostList = () => {
  const { CID } = useParams();
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      const req = await axios
        .get(`https://erp-server-3a3q.onrender.com/post/class/${CID}`)
        .then((res) => {
          setPosts(res.data);
          setLoaded(true);
        });
    };
    getPosts();
  }, [CID]);
  return (
    <div className='h-5/6 w-11/12 flex flex-col items-center shadow-xl mt-5'>
      <h1 className='text-xl font-bold'>Posts</h1>
      <div className='w-full flex justify-around my-10'>
        <input
          placeholder='Type your message here...'
          name='message'
          id='message'
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='input input-bordered w-10/12 text-bgsecondary bg-bgprimary focus:border-bgtertiary shadow-xl'
        />
        <Link to={'/post'} state={{ message: message, CID: CID }}>
          <LoadingButton
            enabled={message.length > 0}
            text={'Add'}></LoadingButton>
        </Link>
      </div>
      {loaded ? (
        posts.map((post) => <PostHeader key={post.PID} post={post} />)
      ) : (
        <LoadingCircle />
      )}
    </div>
  );
};

export default PostList;
