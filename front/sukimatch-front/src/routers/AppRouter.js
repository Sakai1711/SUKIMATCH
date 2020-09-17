import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const Landing = () => {
  return (
    <h1>hello1</h1>
  )
}

const Landing1 = () => {
  return (
    <h1>hoge</h1>
  )
}

const Landing2 = () => {
  return (
    <h1>not found</h1>
  )
}

const AppRouter = () => {
  return (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={Landing} exact={true} />
        <Route path="/hoge" component={Landing1} />
        <Route component={Landing2} />
      </Switch>
    </div>
  </BrowserRouter>
  )
};


export default AppRouter;