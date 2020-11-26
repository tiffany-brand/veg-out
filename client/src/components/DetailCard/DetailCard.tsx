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
  );
}

