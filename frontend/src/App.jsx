import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Register from './containers/User/Register/Register';
import LoginContainer from './containers/User/Login/LoginContainer';
import Home from './containers/Home/Home';

import Header from './components/Header/Header';
import User from './components/User/User';
import Settings from './containers/User/Settings/Settings';
import { getUserInfo } from './redux/actions/users';

function App() {

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      getUserInfo()
      .catch(console.error)
    }
  }, [])

  return (
    <div className="App">   
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path='/register' component={Register} exact />
          <Route path='/login' component={LoginContainer} exact />
          <Route path='/:username' component={User} exact />
          <Route path='/accounts/edit' component={Settings} exact />
          <Route path='' component={Home} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
