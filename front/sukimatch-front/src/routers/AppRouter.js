import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Edit from '../components/Edit'
import Home from '../components/Home';
import Chat from '../components/Chat';
import Header from '../components/Header';

import Login from '../components/Login';
import Signup from '../components/Signup';



const Landing2 = () => {
  return (
    <h1>not found</h1>
  )
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact={true} />
          {/* <Route path="/hoge" component={Landing1} /> */}
          <Route path="/user/edit" component={Edit} />
          <Route path="/chat" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};


export default AppRouter;