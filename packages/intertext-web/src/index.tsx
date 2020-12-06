import React from 'react';
import ReactDOM from 'react-dom';
import { Global, ThemeProvider } from '@emotion/react/macro';
import reportWebVitals from 'reportWebVitals';
import theme, { global } from 'style/theme';
import App from 'App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <App />
    </ThemeProvider>
  </React.StrictMode>
, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
