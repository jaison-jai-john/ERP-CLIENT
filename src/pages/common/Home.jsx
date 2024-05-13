import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserContext from '../../contexts/UserContext';
import { getUser } from '../../helper/API.js';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token || user === null) {
        removeCookie('token', { path: '/', domain: 'localhost' });
        setUser(null);
        navigate('/login');
      } else {
        const data = await getUser(user.UID);
        if (!data.userName) {
          removeCookie('token', { path: '/', domain: 'localhost' });
          navigate('/login');
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie, user, setUser]);
  return (
    <>
      <div className='home_page'></div>
      <ToastContainer />
    </>
  );
};

export default Home;
