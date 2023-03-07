import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Auth from './layouts/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import DashboadLayout from './layouts/dashboadLayout';
import { CounterProvider } from './context/countercontext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboadLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'register',
        element: <About />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

export default function App() {
  return (
    <CounterProvider>
      <RouterProvider router={router} />
    </CounterProvider>
  );
}
