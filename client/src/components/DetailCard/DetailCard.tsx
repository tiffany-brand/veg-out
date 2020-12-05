import React from 'react';
import './DetailCard.css';
import Grid from '@material-ui/core/Grid';


export default function DetailCard(props: any) {

  return (

    // <Grid className="zero-out" item xs={8} sm={4}>
    <Grid className="zero-out" item xs={12} md={6}>
      <div className="dark-box">
        {props.children}
      </div>
    </Grid>
  );
}

