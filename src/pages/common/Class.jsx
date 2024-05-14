import {
  faBook,
  faChartBar,
  faClipboardCheck,
  faGear,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import ClassHeader from '../../components/ClassHeader';
import LoadingCircle from '../../components/LoadingCircle';
import UserContext from '../../contexts/UserContext';

const Class = () => {
  const { CID } = useParams();
  const { user } = useContext(UserContext);
  const pathname = useLocation().pathname;
  const [classInfo, setClassInfo] = useState({
    className: '',
    subjectCode: '',
    teacher: { userName: '' },
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getClass = async () => {
      try {
        const res = await axios
          .get(`https://erp-server-3a3q.onrender.com/class/${CID}`)
          .then(async (res) => {
            if (res.status === 404) {
              throw new Error('Class not found');
            }
            setClassInfo(res.data);
            const teacher = await axios.get(
              `https://erp-server-3a3q.onrender.com/user/${res.data.teacher}`
            );
            setClassInfo({ ...res.data, teacher: teacher.data });
            setLoaded(false);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getClass();
  }, [CID]);

  const isActive = (pathValue) => {
    if (pathname.includes(pathValue)) return selected;
    else return normal;
  };
  const normal =
    'flex items-center justify-center w-auto h-12 mt-2 p-2 rounded hover:text-bgtertiary';
  const selected =
    'flex items-center justify-center w-auto h-12 mt-2 p-2 text-bgtertiary bg-bgprimary rounded-lg';

  const content = loaded ? (
    <div className='flex h-full w-full items-center'>
      <LoadingCircle />
    </div>
  ) : (
    <div id='class' className='flex h-full'>
      <div className='content w-full flex flex-col items-center h-full'>
        <ClassHeader classInfo={classInfo} linked={false} />
        <Outlet></Outlet>
      </div>
      <div className='rounded sidebar flex flex-col w-40 h-5/6 bg-bgprimary text-bgsecondary shadow-xl mr-4'>
        <Link
          to={`/class/${CID}`}
          className={
            pathname.split('/')[pathname.split('/').length - 2] === 'class'
              ? selected
              : normal
          }>
          <FontAwesomeIcon icon={faBook} className='mr-2'></FontAwesomeIcon>
          <p>Class</p>
        </Link>
        <Link to={`/class/${CID}/stats/`} className={isActive('stats')}>
          <FontAwesomeIcon icon={faChartBar} className='mr-2'></FontAwesomeIcon>
          <p>Stats</p>
        </Link>
        <Link
          to={`/class/${CID}/attendance`}
          className={isActive('attendance')}>
          <FontAwesomeIcon
            icon={faClipboardCheck}
            className='mr-2'></FontAwesomeIcon>
          <p>Attendance</p>
        </Link>
        {/* <Link to={'classwork'} className={isActive('classwork')}>
          <FontAwesomeIcon
            icon={faClipboard}
            className='mr-2'></FontAwesomeIcon>
          <p>Classwork</p>
        </Link> */}
        <Link
          to={'settings'}
          state={{ classInfo: classInfo }}
          className={isActive('settings')}>
          <FontAwesomeIcon icon={faGear} className='mr-2'></FontAwesomeIcon>
          <p>Settings</p>
        </Link>
        <Link className={isActive('members')} to={'members'}>
          <FontAwesomeIcon icon={faUsers} className='mr-2'></FontAwesomeIcon>
          <p>Members</p>
        </Link>
      </div>
    </div>
  );

  return content;
};

export default Class;
