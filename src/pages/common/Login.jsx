import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingButton from '../../components/LoadingButton';
import UserContext from '../../contexts/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    userName: '',
    password: '',
    submit: false,
  });
  const { userName, password } = inputValue;

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (cookies.token && user != null) navigate('/');
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: 'bottom-left',
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: 'bottom-left',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        'https://erp-server-3a3q.onrender.com/auth/login',
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setUser(data.user);
        navigate(`/`);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setInputValue({
      ...inputValue,
      userName: '',
      password: '',
    });
  };

  const loginForm = (
    <div className='flex flex-col h-full items-center justify-center'>
      <h3 className='text-bgtertiary border-b-2 border-bgsecondary font-bold text-xl'>
        LOGIN
      </h3>
      <br />
      <form className='grid grid-cols-1 gap-4 w-96' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='userName' className='label cursor-pointer'>
            <span className='label-text text-bgsecondary font-medium'>
              Username:
            </span>
            <input
              className='input input-bordered bg-gray-100 hover:border-bgtertiary focus:border-bgtertiary border-2 '
              id='userName'
              name='userName'
              type='text'
              value={userName}
              onChange={handleOnChange}
              placeholder='Username'
            />
          </label>
        </div>
        <div className='form-control'>
          <label htmlFor='password' className='label cursor-pointer'>
            <span className='label-text text-bgsecondary font-medium'>
              Password:
            </span>
            <input
              className='input input-bordered bg-gray-100 hover:border-bgtertiary focus:border-bgtertiary border-2 '
              name='password'
              type='password'
              id='password'
              value={password}
              onChange={handleOnChange}
              placeholder='Password'
            />
          </label>
        </div>
        <LoadingButton
          enabled={inputValue.password && inputValue.userName ? true : false}
          text={'SUBMIT'}
          loading={loading}></LoadingButton>
        {/* <button type='submit' className='btn'>
          Submit
        </button> */}
      </form>
    </div>
  );

  return <div className='form_container w-full h-full'>{loginForm}</div>;
};

export default Login;
