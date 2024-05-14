import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ClassHeader from '../../components/ClassHeader';
import LoadingCircle from '../../components/LoadingCircle';
import UserContext from '../../contexts/UserContext';

const ClassList = () => {
  const { user } = useContext(UserContext);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const userClasses = await axios.get(
          'https://erp-server-3a3q.onrender.com/class/',
          {
            withCredentials: true,
          }
        );
        if (userClasses) {
          setClasses(userClasses.data);
          setLoading(false);
        } else {
          console.log('failed fetch');
        }
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  return (
    <div
      className='flex flex-col h-full items-center'
      style={{ justifyContent: loading ? 'center' : '' }}>
      <h1 className='font-bold text-bgsecondary'>Classes</h1>
      {loading ? (
        <LoadingCircle />
      ) : (
        <>
          <div className='flex flex-col items-center justify-center'>
            <button type='submit'></button>
          </div>
          <div className='w-2/3 hover:cursor-pointer'>
            {classes.map((item, index) => (
              <ClassHeader key={index} classInfo={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ClassList;
