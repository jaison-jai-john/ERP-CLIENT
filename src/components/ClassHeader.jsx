import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClassHeader = ({ classInfo, linked = true }) => {
  const navigate = useNavigate();
  const { className, subjectCode, teacher, CID } = classInfo;
  return (
    <div
      className={'card w-11/12 shadow-xl hover:shadow-2xl'}
      onClick={
        linked
          ? () => {
              navigate(`/class/${CID}`);
            }
          : () => {}
      }>
      <div className='card-body'>
        <h2 className='card-title'>
          {className}-{subjectCode}
        </h2>
      </div>
      <p className='ml-auto p-5'>by {teacher.userName}</p>
    </div>
    // <div
    //   className='w-full border-2 p-5 rounded-lg mb-3'
    //   onClick={
    //     linked
    //       ? () => {
    //           navigate(`/class/${CID}`);
    //         }
    //       : ''
    //   }>
    //   <h1 className='text-2xl text-left'>
    //     {className}-{subjectCode}
    //   </h1>
    //   <h2 className='text-right text-xl'>by {teacher.userName}</h2>
    // </div>
  );
};

export default ClassHeader;
