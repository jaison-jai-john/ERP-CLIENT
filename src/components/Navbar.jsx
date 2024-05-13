import {
  faBars,
  faBook,
  faBookBookmark,
  faCircleExclamation,
  faHome,
  faRightFromBracket,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function Navbar() {
  const [cookies, setCookies, removeCookies] = useCookies(['token']);
  const [display, setDiplsay] = useState('none');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState('None');
  const pathname = useLocation().pathname.split('/')[1];
  const negateLables = () => {
    if (show !== 'None') {
      setShow('None');
    } else {
      setShow('');
    }
  };

  useEffect(() => {
    if (!cookies.token || !user) {
      setDiplsay('None');
      if (pathname !== 'login') navigate('/login');
    } else {
      setDiplsay('');
    }
  }, [cookies, user]);

  const logout = () => {
    removeCookies('token', { path: '/', domain: 'localhost' });
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='flex h-full w-full'>
      <div
        id='sideBar'
        className='flex flex-col items-center h-full bg-bgprimary text-bgsecondary'
        style={{ width: show ? '4rem' : '8rem', display: display }}>
        <div
          className='flex items-center justify-center w-12 h-12 mt-2 rounded hover:text-bgtertiary cursor-pointer'
          onClick={negateLables}>
          <FontAwesomeIcon icon={faBars} size='xl'></FontAwesomeIcon>
        </div>
        <a className='flex items-center justify-center mt-3' href='#'></a>
        <div className='flex flex-col items-center mt-3 border-t border-gray-300'>
          <Link
            to={'/'}
            className='flex items-center justify-center w-auto h-12 mt-2 p-2 rounded hover:text-bgtertiary'>
            <FontAwesomeIcon
              icon={faHome}
              className={show ? '' : 'mr-2'}></FontAwesomeIcon>
            <p style={{ display: show }}>Home</p>
          </Link>
          <Link
            to={'/profile'}
            className='flex items-center justify-center w-auto h-12 mt-2 p-2 rounded hover:text-bgtertiary'>
            <FontAwesomeIcon
              icon={faUser}
              className={show ? '' : 'mr-2'}></FontAwesomeIcon>
            <p style={{ display: show }}>profile</p>
          </Link>
          <Link
            to={'/classes'}
            className='flex items-center justify-center w-auto h-12 mt-2 p-2 rounded hover:text-bgtertiary'>
            <FontAwesomeIcon
              icon={faBook}
              className={show ? '' : 'mr-2'}></FontAwesomeIcon>
            <p style={{ display: show }}>classes</p>
          </Link>
          {user?.role === 'admin' ? (
            <Link
              to={'/admin/classes'}
              className='flex items-center justify-center w-auto h-12 mt-2 p-2 rounded hover:text-bgtertiary'>
              <FontAwesomeIcon
                icon={faUsers}
                className={show ? '' : 'mr-2'}></FontAwesomeIcon>
              <p style={{ display: show }}>Users</p>
            </Link>
          ) : null}
          {user?.role === 'admin' ? (
            <Link
              to={'/admin/classes'}
              className='flex items-center justify-center w-auto h-12 mt-2 p-2 rounded hover:text-bgtertiary'>
              <FontAwesomeIcon
                icon={faBookBookmark}
                className={show ? '' : 'mr-2'}></FontAwesomeIcon>
              <p style={{ display: show }}>Classes</p>
            </Link>
          ) : null}
          {user?.role === 'admin' ? (
            <Link
              to={'/admin/classes'}
              className='flex items-center justify-center w-auto h-12 mt-2 p-2 rounded hover:text-bgtertiary'>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className={show ? '' : 'mr-2'}></FontAwesomeIcon>
              <p style={{ display: show }}>Announcements</p>
            </Link>
          ) : null}
          <div
            onClick={logout}
            className='flex items-center justify-center w-auto h-12 mt-2 p-2 rounded hover:text-bgtertiary cursor-pointer'>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={show ? '' : 'mr-2'}></FontAwesomeIcon>
            <p style={{ display: show }}>logout</p>
          </div>
        </div>
        {/* <a
        className='flex items-center justify-center w-16 h-16 mt-auto bg-gray-200 hover:bg-bgprimary'
        href='#'></a> */}
      </div>
      <div id='mainView' className='flex flex-col w-full bg-bgprimary h-full'>
        <div
          id='navbar'
          className='flex w-full bg-bgprimary h-16'
          style={{ display: display }}></div>
        <div id='content' className='w-full h-full'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
