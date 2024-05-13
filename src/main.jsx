import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import MemberList from './components/MemberList';
import './index.css';
import AddAnnouncement from './pages/admin/AddAnnouncement';
import AddClass from './pages/admin/AddClass';
import AddUser from './pages/admin/AddUser';
import AdminClassList from './pages/admin/AdminClassList';
import AnnouncementList from './pages/admin/AnnouncementList';
import UserList from './pages/admin/UserList';
import AddAttendance from './pages/common/AddAttendance';
import Attendance from './pages/common/Attendance';
import Class from './pages/common/Class';
import ClassList from './pages/common/ClassList';
import ClassStats from './pages/common/ClassStats';
import EditAttendance from './pages/common/EditAttendance';
import Home from './pages/common/Home';
import Login from './pages/common/Login';
import Post from './pages/common/Post';
import PostList from './pages/common/PostList';
import PostSettings from './pages/common/PostSettings';
import AddPost from './pages/teacher/AddPost';
import EditClass from './pages/teacher/EditClass';
import EditPost from './pages/teacher/EditPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/admin',
        element: <Home />,
        children: [
          {
            path: 'classes',
            element: <AdminClassList />,
          },
          {
            path: 'addclass',
            element: <AddClass />,
          },
          {
            path: 'users',
            element: <UserList />,
          },
          {
            path: 'adduser',
            element: <AddUser />,
          },
          {
            path: 'announcements',
            element: <AnnouncementList />,
          },
          {
            path: 'addAnnouncement',
            element: <AddAnnouncement />,
          },
        ],
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:id',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/classes',
        element: <ClassList />,
      },
      {
        path: '/class/:CID',
        element: <Class />,
        children: [
          {
            path: '',
            element: <PostList />,
          },
          {
            path: 'classwork',
            element: <PostList />,
          },
          {
            path: 'settings',
            element: <EditClass />,
          },
          {
            path: 'members',
            element: <MemberList />,
          },
          {
            path: 'attendance',
            element: <Attendance />,
          },
          {
            path: 'attendance/add',
            element: <AddAttendance />,
          },
          {
            path: 'attendance/edit',
            element: <EditAttendance />,
          },
          {
            path: 'edit',
            element: <EditClass />,
          },
          {
            path: 'stats',
            element: <ClassStats />,
          },
        ],
      },
      {
        path: '/post',
        element: <AddPost />,
      },
      {
        path: '/post/:PID',
        element: <Post />,
        children: [
          {
            path: 'edit',
            element: <EditPost />,
          },
          {
            path: 'settings',
            element: <PostSettings />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
