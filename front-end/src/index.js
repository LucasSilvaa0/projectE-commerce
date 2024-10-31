import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Logo from "./logo"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <Logo />

    <App />
  </QueryClientProvider>
);

reportWebVitals();
