import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Edit from '../components/Edit'
import Home from '../components/Home';
import Chat from '../components/Chat';
import Header from '../components/Header';
import StartSearch from '../components/SearchPage/StartSearch';


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
          <Route path="/search" component={StartSearch} />
          <Route path="/chat" component={Chat} />
          <Route component={Landing2} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};


export default AppRouter;