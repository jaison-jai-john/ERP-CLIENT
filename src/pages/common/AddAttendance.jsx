import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingCircle from '../../components/LoadingCircle';

const AddAttendance = () => {
  const { date, CID, attendance } = useLocation().state;
  const [members, setMembers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [UIDs, setUIDs] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/class/${CID}/members`
        );
        setMembers(res.data);
        setUIDs(res.data.map((member) => member.UID));
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    getMembers();
  }, [CID]);

  const handleSubmit = async (e, UID) => {
    try {
      if (e.target.value === 'present') {
        if (!UIDs.includes(UID)) setUIDs([...UIDs, UID]);
      } else {
        setUIDs(UIDs.filter((id) => id !== UID));
      }
      const res = await axios.patch(`http://localhost:5050/attendance/`, {
        CID: CID,
        UID: UID,
        date,
        status: e.target.value,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-11/12 h-5/6 flex items-center'>
      <div className='w-11/12 h-5/6 flex flex-col items-center'>
        <h1 className='text-xl font-bold'>Add Attendance</h1>
        <div className='w-full flex flex-col items-center mt-5 shadow-xl'>
          {loaded ? (
            members.map((member, index) => (
              <div
                key={index}
                className='w-11/12 flex justify-between items-center p-2 border-b border-bgsecondary'>
                <h1>{member.userName}</h1>
                <select
                  onChange={(e) => handleSubmit(e, member.UID)}
                  name='attended'
                  id='attended'
                  value={UIDs.includes(member.UID) ? 'present' : 'absent'}>
                  <option value='present'>Present</option>
                  <option value='absent'>Absent</option>
                </select>
                {/* <input
                  type='checkbox'
                  checked={UIDs.includes(member.UID)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUIDs([...UIDs, member.UID]);
                    } else {
                      setUIDs(UIDs.filter((UID) => UID !== member.UID));
                    }
                  }}
                /> */}
              </div>
            ))
          ) : (
            <LoadingCircle />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAttendance;
