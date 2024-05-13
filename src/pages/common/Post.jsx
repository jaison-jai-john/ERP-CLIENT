import {
  faCheckCircle,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '../../components/LoadingButton';
import LoadingCircle from '../../components/LoadingCircle';
import UserContext from '../../contexts/UserContext';

const Post = () => {
  const { PID } = useParams();
  const pathname = useLocation().pathname;
  const [post, setPost] = useState({
    message: '',
    created: '',
    due: '',
    content: '',
  });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`http://localhost:5050/post/${PID}`);
      setPost(res.data);
      setLoaded(true);
    };
    getPost();
  });

  const deletePost = async () => {
    const req = await axios
      .delete(`http://localhost:5050/post/${post.PID}`)
      .then((res) => {
        if (res.status === 200) {
          navigate(`/class/${post.CID}`);
        }
      });
  };
  const isActive = (pathValue) => {
    if (pathname.includes(pathValue)) return selected;
    else return normal;
  };
  const normal =
    'flex items-center justify-center w-auto h-12 mt-2 p-2 rounded hover:text-bgtertiary';
  const selected =
    'flex items-center justify-center w-auto h-12 mt-2 p-2 text-bgtertiary bg-bgprimary rounded-lg';
  return loaded ? (
    <div className='flex h-full w-full'>
      <div className='w-full'>
        <div className='post-header gap-4 card p-10 shadow-xl w-11/12'>
          <h1 className='text-bgsecondary text-xl font-bold'>{post.message}</h1>
          <div className='flex gap-5'>
            <h1>created: {new Date(post.created).toDateString()}</h1>
            {post.due ? (
              <h1>due: {new Date(post.due).toDateString()}</h1>
            ) : null}
          </div>
          {post.content ? (
            <div className='text-bgsecondary'>{post.content}</div>
          ) : null}
          {post.postType === 'assignment' ? (
            <div>
              <input type='file' name='' id='' multiple />{' '}
              <LoadingButton
                enabled={true}
                loading={false}
                text={'Submit'}></LoadingButton>
            </div>
          ) : null}
        </div>
        <div className='shadow-xl w-11/12'>
          <Outlet></Outlet>
        </div>
      </div>
      <div className='rounded sidebar flex flex-col w-40 h-5/6 bg-bgprimary text-bgsecondary shadow-xl mr-4'>
        {/* <div
          className={isActive('settings')}
          onClick={() => {
            navigate(`/post/${post.PID}/settings`, { state: { post } });
          }}>
          <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
        </div> */}
        <div
          className={isActive('edit')}
          onClick={() => {
            navigate(`/post/${post.PID}/edit`, { state: { post } });
          }}>
          <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
        </div>
        {user.role === 'teacher' ? (
          <div className={normal}>
            <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
          </div>
        ) : null}
        {user.role === 'teacher' ? (
          <div className={normal} onClick={deletePost}>
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <LoadingCircle />
  );
};

export default Post;
