import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Header = () => {
  return (
  <header>
    <NavLink to="/" activeClassName="is-active" exact={true} >Home</NavLink>
    <NavLink to="/user" activeClassName="is-active" exact={true} >Mypage</NavLink>
    <NavLink to="/login" activeClassName="is-active" >Login</NavLink>
    <NavLink to="/user/edit" activeClassName="is-active" >Edit</NavLink>
  </header>
  )
}

export default Header;