import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { AuthContext } from '../context/authContext';
import { CounterProvider } from '../context/countercontext';
import { ProductProvider } from '../context/productContext';

function DashboadLayout() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <ProductProvider>
      <CounterProvider>
        <Header />
        <Outlet />
      </CounterProvider>
    </ProductProvider>
  );
}

export default DashboadLayout;
