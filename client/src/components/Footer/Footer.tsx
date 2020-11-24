import React from 'react';

import "./Footer.css";

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

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Grid container spacing={2} className="veggie-footer-parent">
        <Grid item xs={12}>
          <footer className="veggie-footer">Veggies
          </footer>
        </Grid>
      </Grid>
    </div>
  );
}