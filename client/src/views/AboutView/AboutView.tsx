import React from 'react';
import About from "../../components/About/About";
import logo from '../../assets/images/stroked-vedgeIn-logo-1200.png';
import Grid from '@material-ui/core/Grid';
import './AboutView.css';


function AboutView(): JSX.Element {


  return (


    <div className="about-screen">

      <h2 className="view-title">Welcome To Vedge-In!</h2>
      <Grid item xs={12} container justify="space-around">
        <div className="about-dark-box component-style">
          <About />
          <img className="about-logo" src={logo} alt="Vedge-In logo" />
        </div>
      </Grid>
    </div>

  )

};
export default AboutView;