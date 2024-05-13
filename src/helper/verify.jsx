import axios from 'axios';

export const verifyAccess = async (role) => {
  return await axios.get(
    'http://localhost:5050/user/verifyaccess',
    { role },
    { withCredentials: true }
  );
};
