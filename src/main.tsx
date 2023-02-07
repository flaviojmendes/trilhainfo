import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ToastProvider from './contexts/ToastContext';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <BrowserRouter>
      <Auth0Provider
        domain="trilha-info.us.auth0.com"
        clientId="ZPGRWe1CKiY84dCDtfTm6yy3ibSQbH4s"
        redirectUri={window.location.origin + '/login'}
        audience="TrilhaInfoApi"
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ToastProvider>,
);
