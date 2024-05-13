import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { getClass, getUser } from '../../helper/API';

const EditClass = () => {
  const { CID } = useParams();
  const navigate = useNavigate();
  const [classInfo, setClassInfo] = useState(useLocation().state.classInfo);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const syncClass = async () => {
      const res = await getClass(CID);
      if (!classInfo) {
        if (res) {
          setClassInfo(res);
          const teacher = await getUser(classInfo.teacher);
          setClassInfo({ ...classInfo, ...teacher });
        }
      }
    };
    syncClass();
  }, [CID]);

  return (
    <div className='w-11/12 h-5/6 shadow-xl mt-5'>
      <div className='card rounded-box p-5 justify-center'>
        <p> Class Code: {classInfo.CID} </p>
      </div>
      <div className='divider'></div>
      <div className='card rounded-box p-5 flex flex-row'>
        <div className='mr-5'>Teacher: </div>
        <div className='flex justify-between w-11/12'>
          <p>{classInfo.teacher.userName}</p>
          <button className='bg-bgprimary text-bgsecondary btn border-2 border-bgtertiary hover:border-bgprimary hover:text-bgprimary hover:bg-bgtertiary'>
            Message
          </button>
        </div>
      </div>
      {classInfo.gclass ? (
        <div className='card rounded-box p-5 flex flex-row justify-center'>
          <a href={classInfo.gclass}>
            <button className='bg-bgprimary text-bgsecondary btn border-2 border-bgtertiary hover:border-bgprimary hover:text-bgprimary hover:bg-bgtertiary'>
              Join Google Classroom
            </button>
          </a>
        </div>
      ) : user.role === 'teacher' ? (
        <div className='card rounded-box p-5 flex flex-row justify-center'>
          <button className='bg-bgprimary text-bgsecondary btn border-2 border-bgtertiary hover:border-bgprimary hover:text-bgprimary hover:bg-bgtertiary'>
            Create Google Classroom
          </button>
        </div>
      ) : (
        ''
      )}
      {classInfo.whatsapp ? (
        <div className='card rounded-box p-5 flex flex-row justify-center'>
          <a href={classInfo.whatsapp}>
            <button className='bg-bgprimary text-bgsecondary btn border-2 border-bgtertiary hover:border-bgprimary hover:text-bgprimary hover:bg-bgtertiary'>
              Join Whatsapp Group
            </button>
          </a>
        </div>
      ) : user.role === 'teacher' ? (
        <div className='card rounded-box p-5 flex flex-row justify-center'>
          <button className='bg-bgprimary text-bgsecondary btn border-2 border-bgtertiary hover:border-bgprimary hover:text-bgprimary hover:bg-bgtertiary'>
            Create Whatsapp Group
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default EditClass;
