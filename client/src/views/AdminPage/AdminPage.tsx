import React, { useRef } from 'react';
import About from "../../components/About/About";
import logo from '../../assets/images/stroked-vedgeIn-logo-1200.png';
import Grid from '@material-ui/core/Grid';



function AdminPage(): JSX.Element {
    const newVeggieInput = useRef<HTMLInputElement | null>(null);

  return (
<>
    <div className="admin-page">
    <img className="about-logo" src={logo} alt="Vedge-In logo" />
    <Grid item xs={12} container justify="space-around">
        <div className="about-dark-box component-style">
        <h1>This is the admin page!  Don't tell anyone.</h1>
        <h3>Input your fruit or veggie below. Be certain of spelling before your submission!</h3>
        <input ref={newVeggieInput} type="text" />
          
        </div>
      </Grid>
    </div>
</>

  )

};
export default AdminPage;