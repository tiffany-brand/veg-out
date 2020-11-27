import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "./TestGrid.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    myStyle: {

    }
  }),
);

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root} id="divCon">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=6</Paper>
          <div className="testContainer">My Div</div>
          <Grid container className="testDiv">
            <p>p1</p>
            <p>p2</p>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>this one</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
