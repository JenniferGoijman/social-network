import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import User from './components/User/User';

import Register from './containers/User/Register/Register';
import LoginContainer from './containers/User/Login/LoginContainer';
import Home from './containers/Home/Home';

function App() {
  console.log(window.location.pathname);

  const showHeader = (path) => {
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
        { showHeader(window.location.pathname) ? <Header/> : '' }
        <Switch>
          <Route path='/register' component={Register} exact />
          <Route path='/login' component={LoginContainer} exact />
          <Route path='/:username' component={User} exact />
          <Route path='' component={Home} exact />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
