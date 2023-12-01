import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

const root = document.createElement('div');
root.className = 'container';
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);

const windowReloaded = () => {
  window.location.reload();
};

// event listner triggered when user navigates to new tab / reloads page
chrome.devtools.network.onNavigated.addListener(windowReloaded);

rootDiv.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
