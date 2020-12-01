import React, { useRef, useState } from 'react';
import About from "../../components/About/About";
import logo from '../../assets/images/stroked-vedgeIn-logo-1200.png';
import Grid from '@material-ui/core/Grid';
import VeggieAPI from '../../utils/veggiesAPI';
import IVeggies from '../../interfaces/IVeggies';



function AdminPage(): JSX.Element {
    const [input, setInput] = useState("");

    const updateSearchArray = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)  
      };


    const submitNewPlant = () => {
        VeggieAPI.saveVeggie({plantName: input}).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

  return (
<>
    <div className="admin-page">
    <img className="about-logo" src={logo} alt="Vedge-In logo" />
    <Grid item xs={12} container justify="space-around">
        <div className="about-dark-box component-style">
        <h1>This is the admin page!  Don't tell anyone.</h1>
        <h3>Input your fruit or veggie below. Be certain of spelling before your submission!</h3>
        <input value={input} onChange={updateSearchArray} type="text" />
          <button type="button">Press To Submit</button>
        </div>
      </Grid>
    </div>
</>

  )

};
export default AdminPage;