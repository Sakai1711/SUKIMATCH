import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/Home'
import Edit from '../components/Edit'

// const Landing = () => {
//   return (
//     <h1>hello</h1>
//   )
// }

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
          <Route path="/" component={Home} exact={true} />
          <Route path="/hoge" component={Landing1} />
          <Route path="/user/edit" children={<Edit />} />
          <Route component={Landing2} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};


export default AppRouter;