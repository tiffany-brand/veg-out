import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import "./Header.css";
import Grid from '@material-ui/core/Grid';

export default function Header() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [navActive, setNavActive] = useState(false);
  const burgerReveal = () => {
    setNavActive(!navActive);
  };

  return (
    <div>
      <Grid container spacing={2} className="white-background">
        <Grid item xs={10}>
          <h1 className="veggie-header">Vedge-In</h1>
        </Grid>
        {/*Start nav*/}
        <Grid item xs={2}>
          <nav>
            <div className="mobile-menu" onClick={burgerReveal}>
              <div className="top-bun"></div>
              <div className="burger-patty"></div>
              <div className="bottom-bun"></div>
            </div>
            <ul className={`nav-bar ${navActive ? "mobile-menu-display" : null}`}>

              <Link to='/about'>
                <li onClick={burgerReveal}>About</li>
              </Link>
              <Link to='/home'>
                <li onClick={burgerReveal}>Home</li>
              </Link>
              <Link to='/community'>
                <li onClick={burgerReveal}>Challenges</li>
              </Link>
              <Link to='/leaderboard'>
                <li onClick={burgerReveal}>Leaderboard</li>
              </Link>
              <Link to='/profile'>
                <li onClick={burgerReveal}>My Profile</li>
              </Link>
              {!isAuthenticated && <Link to='/' onClick={loginWithRedirect}>
                <li onClick={burgerReveal}>Login</li>
              </Link>}
              {isAuthenticated && <Link to='/' onClick={() => logout({ returnTo: window.location.origin })}>
                <li onClick={burgerReveal}>Logout</li>
              </Link>}
            </ul>
          </nav>
        </Grid>
      </Grid>
    </div>
  );
}