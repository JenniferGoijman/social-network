import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Register from './containers/User/Register/Register';
import LoginContainer from './containers/User/Login/LoginContainer';
import Settings from './containers/User/Settings/Settings';
import Home from './containers/Home/Home';
import NewPost from './containers/NewPost/NewPost';
import Posts from './containers/Posts/Posts';

import Header from './components/Header/Header';
import User from './components/User/User';

import { getMyUser } from './redux/actions/users';


function App() {

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      getMyUser()
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
          <Route path='/create' component={NewPost} exact />
          <Route path='/feed' component={Posts} exact />
          <Route path='/:username' component={User} exact />
          <Route path='/accounts/edit' component={Settings} exact />
          <Route path='' component={Home} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
