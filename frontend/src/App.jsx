import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Register from './containers/User/Register/Register';
import LoginContainer from './containers/User/Login/LoginContainer';
import Settings from './containers/User/Settings/Settings';
import Home from './containers/Home/Home';
import NewPost from './containers/NewPost/NewPost';
import PostsFeed from './containers/PostsFeed/PostsFeed';
import Profile from './containers/User/Profile/Profile';
import SearchMobile from './containers/SearchMobile/SearchMobile';
import ResetPassword from './containers/User/ResetPassword/ResetPassword';
import BigPostsMobile from './containers/BigPostsMobile/BigPostsMobile';

import Header from './components/Header/Header';

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
          <Route path='/accounts/password/reset' component={ResetPassword} exact />
          <Route path='/create' component={NewPost} exact />
          <Route path='/posts/:username' component={BigPostsMobile} exact />
          <Route path='/feed' component={PostsFeed} exact />
          <Route path='/search' component={SearchMobile} exact />
          <Route path='/:username' component={Profile} exact />
          <Route path='/accounts/edit' component={Settings} exact />
          <Route path='' component={Home} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;