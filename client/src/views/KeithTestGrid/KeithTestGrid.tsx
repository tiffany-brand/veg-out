import React from 'react';

import "./KeithTestGrid.css";

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
    <div>
      <Grid item xs={12} container justify="space-around">
        <Grid item xs={8} sm={4}>
          <div className="veggie-box">Left Box</div>
        </Grid>
        <Grid item xs={8} sm={4}>
          <div className="veggie-box">Right Box</div>
        </Grid>
      </Grid>
    </div>
  );

}