import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Chat from '../components/Chat';
import Header from '../components/Header';




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
          <Route path="/chat" component={Chat} />
          <Route component={Landing2} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};


export default AppRouter;