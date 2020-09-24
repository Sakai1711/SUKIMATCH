import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function Header() {
  const showHeader = () => {
    if (window.location.pathname !== '/chat'){
      return (
        <nav className='global-nav'>
          {showLoginorNot()}
        </nav>
      );
    }else{
      return 
    }
  }

  const showLoginorNot = () => {
    if (!!sessionStorage.getItem('access_token')) {
      return(
        <nav className='global-nav'>
          <NavLink to="/" className='nav-item' activeClassName='is-active' exact={true} >Home</NavLink>
          <a href="/#about" className='nav-item'>About</a>
          <NavLink to="/search" className='nav-item' activeClassName='is-active' >Search</NavLink>
          <NavLink to="/user/edit" className='nav-item' activeClassName='is-active' >Edit</NavLink>
          <NavLink to="/" className='nav-item' >Log out</NavLink>
        </nav>
      )
    }else{
      return (
        <nav className='global-nav'>
          <NavLink to="/" className='nav-item' activeClassName='is-active' exact={true} >Home</NavLink>
          <a href="/#about" className='nav-item'>About</a>
          <NavLink to="/login" className='nav-item' activeClassName='is-active' >Log in</NavLink>
          <NavLink to="/signup" className='nav-item' activeClassName='is-active' >sign up</NavLink>
        </nav>
      )
    }
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Typography variant='h2' gutterBottom>
          SukiMatch
      </Typography>
      </div>
      {showHeader()}
    </header>
  )
}

export default Header;