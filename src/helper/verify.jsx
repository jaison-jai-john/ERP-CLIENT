import axios from 'axios';

export const verifyAccess = async (role) => {
  return await axios.get(
    'https://erp-server-3a3q.onrender.com/user/verifyaccess',
    { role },
    { withCredentials: true }
  );
};
