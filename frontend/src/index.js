import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App.jsx';
import WebFont from 'webfontloader';


WebFont.load({
  google: {
    families: ['Noah Regular', 'sans-serif']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
