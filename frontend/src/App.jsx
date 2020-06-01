import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Register from './containers/User/Register/Register';
import LoginContainer from './containers/User/Login/LoginContainer';
import Home from './containers/Home/Home';

import Header from './components/Header/Header';
import User from './components/User/User';
import Settings from './containers/User/Settings/Settings';

function App() {
  const showHeader = () => {
    const path = window.location.pathname;
    let show;
    if (path==='/register' || path==='/login' || path==='/') {
      show = false;
    } else {
      show = true;
    }
    return show;
  }

  return (
    <div className="App">   
      <BrowserRouter>
        { showHeader() ? <Header/> : '' }
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
