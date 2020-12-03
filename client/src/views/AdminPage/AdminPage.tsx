import React, { useRef, useState } from 'react';
import About from "../../components/About/About";
import logo from '../../assets/images/stroked-vedgeIn-logo-1200.png';
import Grid from '@material-ui/core/Grid';
import VeggieAPI from '../../utils/veggiesAPI';
import IVeggies from '../../interfaces/IVeggies';



function AdminPage(): JSX.Element {
    const [input, setInput] = useState("");
    const [submissionResponse, setSubmissionResponse] = useState("");
    // This local state will record wether the most recent submission cleared or not. 

    const updateSearchArray = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value);
        setSubmissionResponse("");  
      };


    const submitNewPlant = () => {
        VeggieAPI.saveVeggie({plantName: input}).then((res) => {
            setInput("");
            setSubmissionResponse("success");
            console.log(res);
        }).catch((err) => {
          setSubmissionResponse("failure");
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
        <h3>Input your new fruit or veggie below. Be certain of spelling before your submission!</h3>
        <input value={input} onChange={updateSearchArray} type="text" />
          <button type="button" onClick={submitNewPlant}>Press To Submit Your New Plant.</button>
          {submissionResponse === "success" &&
          <h3>Success!! Your veggie has been added to the DB.</h3>}
          {submissionResponse === "failure" &&
          <h3>Failure!! Are you sure it wasn't already in the DB? Hhhmm?</h3>}
        </div>
      </Grid>
    </div>
</>

  )

};
export default AdminPage;