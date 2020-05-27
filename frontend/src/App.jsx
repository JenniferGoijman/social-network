import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Profile from './containers/Profile/Profile';
import Register from './containers/User/Register/Register';

function App() {
  return (
    <div className="App">   
      <BrowserRouter>
        { !window.location.href.includes('register') ? <Header/>:'' }
        <Switch>
          <Route path='/profile' component={Profile} exact />
          <Route path='/register' component={Register} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
