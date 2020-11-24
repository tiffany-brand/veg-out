import React from 'react';
import './DetailCard.css';
import Grid from '@material-ui/core/Grid';


export default function DetailCard(props: any) {

  return (

    <Grid item xs={8} sm={4}>
      <div className="veggie-box">
        {props.children}
      </div>
    </Grid>

    // <div className="parent">
    //   <div className="detail-card" >
    //     {props.children}
    //   </div>
    // </div>
  );
}

{/* <Grid item xs={8} sm={4}>
          <div className="veggie-box"><ul>
            <li>TOTAL HP: {loggedInUser.currenthealth}</li>
            <li>OFFENSE: {loggedInUser.currentoffense}</li>
            <li>DEFENSE: {loggedInUser.currentdefense}</li>
          </ul></div>
        </Grid> */}

