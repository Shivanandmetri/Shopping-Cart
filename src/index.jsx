import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { AuthProvider } from './context/authContext';
import { ErrorProvider } from './context/errorContecxt';
import { LoadingProvider } from './context/loadingContext';
import ErrorBoundary from './ErrorBoundary';
import './style.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <LoadingProvider>
      <ErrorProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ErrorProvider>
    </LoadingProvider>
  </ErrorBoundary>,
);
