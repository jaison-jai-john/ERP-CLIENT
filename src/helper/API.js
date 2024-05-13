import axios from 'axios';

export const getUser = async (id) => {
  if (!id) return false;
  const req = await axios.get(
    `http://localhost:5050/user/${id}`,
    {},
    { withCredentials: true }
  );
  if (req.status === 200) {
    return req.data;
  } else {
    return false;
  }
};

export const getClass = async (CID) => {
  if (!CID) return false;
  const req = await axios.get(
    `http://localhost:5050/class/${CID}`,
    {},
    { withCredentials: true }
  );
  if (req.status === 200) {
    return req.data;
  } else {
    return false;
  }
};

export const getClasses = async () => {
  const req = await axios.get(
    `http://localhost:5050/class`,
    {},
    { withCredentials: true }
  );
  if (req.status === 200) {
    return req.data;
  } else {
    return false;
  }
};

export const getPosts = async (CID) => {
  if (!CID) return false;
  const req = await axios.get(
    `http://localhost:5050/post/class/${CID}`,
    {},
    { withCredentials: true }
  );
  if (req.status === 200) {
    return req.data;
  } else {
    return false;
  }
};

export const getPost = async (PID) => {
  if (!PID) return false;
  const req = await axios.get(
    `http://localhost:5050/post/${PID}`,
    {},
    { withCredentials: true }
  );
  if (req.status === 200) {
    return req.data;
  } else {
    return false;
  }
};
