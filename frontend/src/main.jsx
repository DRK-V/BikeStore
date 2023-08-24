import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { createRoot } from 'react-dom/client'; // Importa createRoot

import App from './page/App';
const root = document.getElementById('root');

// Usar createRoot en lugar de render
createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
