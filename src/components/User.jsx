import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const User = () => {
  // control form
  const [form, setForm] = useState({
    userName: '',
    password: '',
    email: '',
    role: '',
    joined: Date.now(),
  });

  // used to determine if we are adding or updating user
  const [isNew, setIsNew] = useState(true);
  // get params to extract id
  const params = useParams();
  const navigate = useNavigate();

  // on page load check if the user is new or existing
  useEffect(() => {
    const fetchData = async () => {
      // extract id
      const id = params.id?.toString() || undefined;
      // if no id return
      if (!id) return;

      // is new
      setIsNew(false);
      // fetch user using id
      const response = await fetch(
        `https://erp-server-3a3q.onrender.com/user/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      // get user
      const user = await response.json();
      // if user not found
      if (!user) {
        console.warn(`User with id ${id} not found`);
        navigate('/');
        return;
      }
      // set form
      setForm(user);
    };
    fetchData();
  }, [params.id, navigate]);

  // update form
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  const onSubmit = async (e) => {
    // stop submission
    e.preventDefault();

    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if new user then post
        response = await fetch(
          'https://erp-server-3a3q.onrender.com/user/add',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
          }
        );
      } else {
        // if existing user then patch
        response = await fetch(
          `https://erp-server-3a3q.onrender.com/user/update/${params.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
          }
        );
      }

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setForm({ name: '', position: '', level: '' });
      navigate(`/`);
    }
  };

  const deleteUser = async () => {
    const res = await fetch(
      `https://erp-server-3a3q.onrender.com/user/delete/${params.id}`
    );
    if (!res.ok) {
      const message = `An error has occurred: ${res.statusText}`;
      console.error(message);
      return;
    }
    navigate(`/`);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='userName'>username</label>
          <input
            type='text'
            name='userName'
            id='userName'
            value={form.userName}
            onChange={(e) => updateForm({ userName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor='role'>role</label>
          <input
            type='text'
            name='role'
            id='role'
            value={form.role}
            onChange={(e) => updateForm({ role: e.target.value })}
          />
        </div>
        <input type='submit' value={isNew ? 'Add user' : 'Update User'} />
        {!isNew && <input type='button' value='Delete' onClick={deleteUser} />}
      </form>
    </>
  );
};

export default User;
