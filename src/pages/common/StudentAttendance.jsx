import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

const StudentAttendance = () => {
  const { CID } = useParams();
  const { user } = useContext(UserContext);
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const [days, setDays] = useState([]);
  // const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const getStudentAttendance = () => {
      attendance.forEach((att) => {
        if (att.students.includes(user.UID) && !days.includes(att)) {
          setDays([...days, att]);
        }
      });
    };
    const getClassAttendance = async () => {
      if (attendance.length > 0) return;
      const res = await axios.get(
        `https://erp-server-3a3q.onrender.com/attendance/${CID}`
      );
      setAttendance(res.data);
    };
    getClassAttendance();
    getStudentAttendance();
  }, [CID, user.UID, attendance]);

  return (
    <div className='h-5/6 w-11/12 shadow-xl flex flex-col items-center mt-5'>
      <h1 className='text-bgsecondary font-bold text-xl'>Attendance</h1>
      <div className='w-full flex flex-col items-center'>
        {days.map((att) => {
          return (
            <div
              key={att._id}
              className='w-11/12 flex justify-between items-center p-2 border-b border-bgsecondary'>
              <h1>{new Date(att.date).toISOString().split('T')[0]}</h1>
              <h1>{att.students.includes(user.UID) ? 'present' : 'absent'}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentAttendance;
