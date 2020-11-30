import React from 'react';

import "./RachelTest.css";

import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,

    },
    center: {
      align: 'center',
    }
  }),
);

export default function NewView() {
  const classes = useStyles();


  return (
    // <div className="component-style">
    //   <Grid item xs={12} container justify="space-around">
    //     <Grid item xs={8} sm={4}>
    //       <div className="veggie-box">Left Box</div>
    //     </Grid>
    //     <Grid item xs={8} sm={4}>
    //       <div className="veggie-box">Right Box</div>
    //     </Grid>
    //   </Grid>
    // </div>
    // <>
    //   <div className="component-style">
    //     <Grid item xs={6} container justify="space-around">
    //       <Grid item xs={8} sm={4}>
    //         <div className="veggie-box">Left Box</div>
    //       </Grid>
    //       <Grid item xs={8} sm={4}>
    //         <div className="veggie-box">Right Box</div>
    //       </Grid>
    //     </Grid>
    //   </div>
    // </>
    <>
      <Grid container justify="space-around" spacing={3} className="component-style">
        <Grid className="zero-out" item xs={12} md={6}>
          <div className="dark-box">
            <h2 >Your Stats</h2>
            <p>This is my paragraph</p>
          </div>
        </Grid>
        <Grid className="zero-out" item xs={12} md={6}>
          <div className="dark-box">
            <h2 >Log Veggies</h2>
          </div>
        </Grid>
      </Grid>
    </>
  );

}