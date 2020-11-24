import React from 'react';

import "./Header.css";

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

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className="white-background">
        <Grid item xs={10}>
          {/* Header Component */}
          <h1 className="veggie-header">Veggie Challenge</h1>
        </Grid>
        <Grid item xs={2}>
          <h4 className="veggie-menu">Menu</h4>
          {/* Menu Component */}
        </Grid>
      </Grid>
    </div>
  );

}