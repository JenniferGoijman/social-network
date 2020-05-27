import React from 'react'
import './LoginContainer.scss'
import Login from '../../../components/Login/LoginComponent';

const LoginContainer = props => {
    return (
      <div className="login-container"><Login></Login></div>    
    );
  };

export default LoginContainer;