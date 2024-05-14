import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '../../components/LoadingButton';
import UserContext from '../../contexts/UserContext';
import StudentAttendance from './StudentAttendance';

const Attendance = () => {
  const { CID } = useParams();
  const { user } = useContext(UserContext);
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const getStudentAttendance = async () => {
    const res = await axios.get(
      `https://erp-server-3a3q.onrender.com/attendance/${user.UID}`
    );
    console.log(res.data);
  };

  const getClassAttendance = async () => {
    const res = await axios.get(
      `https://erp-server-3a3q.onrender.com/attendance/${CID}`
    );
    setAttendance(res.data);
  };

  useEffect(() => {
    getClassAttendance();
  });

  return (
    <div className='h-full w-full'>
      {user.role === 'student' ? (
        <StudentAttendance />
      ) : (
        <div className='h-5/6 w-11/12 shadow-xl flex flex-col items-center mt-5'>
          <h1 className='text-bgsecondary font-bold text-xl'>Attendance</h1>
          <div className='w-full flex flex-col items-center'>
            <div className='w-full flex justify-around my-10'>
              <input
                name='date'
                id='date'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='input input-bordered w-10/12 text-bgsecondary bg-bgprimary focus:border-bgtertiary shadow-xl'
              />
              <Link to={'add'} state={{ date: date, CID: CID }}>
                <LoadingButton enabled={true} text={'Add'}></LoadingButton>
              </Link>
            </div>
            {attendance.map((att) => {
              return (
                <div
                  key={att._id}
                  className='w-11/12 flex justify-between items-center p-2 border-b border-bgsecondary'>
                  <h1>{new Date(att.date).toISOString().split('T')[0]}</h1>
                  <Link
                    to={'edit'}
                    state={{ attendance: att, date: date, CID: CID }}>
                    <LoadingButton
                      text={'edit'}
                      loading={false}
                      enabled={true}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
