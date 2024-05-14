import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingCircle from './LoadingCircle';

const MemberList = () => {
  const { CID } = useParams();
  const [members, setMembers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await axios.get(
          `https://erp-server-3a3q.onrender.com/class/${CID}/members`
        );
        setMembers(res.data);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    getMembers();
  }, [CID]);

  const membersList = members.map((member, index) => (
    <div key={index} className='card w-11/12 shadow-xl'>
      <div className='flex flex-row justify-between card-body'>
        <div>{member.userName}</div>
        <button className='btn text-bgsecondary bg-bgprimary border-2 border-bgtertiary hover:bg-bgtertiary hover:text-bgprimary hover:border-bgprimary'>
          Message
        </button>
      </div>
    </div>
  ));
  return (
    <div
      className={`h-5/6 w-11/12 flex flex-col items-center ${
        !loaded ? 'justify-center' : ''
      }`}>
      <h1 className='text-xl font-bold'>Members</h1>
      <div className='h-full w-full flex flex-col items-center mt-5 shadow-xl'>
        {loaded ? membersList : <LoadingCircle />}
      </div>
    </div>
  );
};

export default MemberList;
