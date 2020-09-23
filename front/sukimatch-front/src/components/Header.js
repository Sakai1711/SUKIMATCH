import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Header = () => {
  return (
  <header className='header'>
    <div className='logo'>
      <Typography variant='h2' gutterBottom>
        SukiMatch
      </Typography>
    </div>
    <nav className='global-nav'>
      <NavLink to="/" className='nav-item' activeClassName='is-active' exact={true} >Home</NavLink>
      <NavLink to="/user" className='nav-item' activeClassName='is-active' exact={true} >Mypage</NavLink>
      <NavLink to="/user/hoge" className='nav-item' activeClassName='is-active' >Log in</NavLink>
      <NavLink to="/user/edit" className='nav-item' activeClassName='is-active' >Edit</NavLink>
    </nav>
  </header>
  )
}

export default Header;