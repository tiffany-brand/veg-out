import React from 'react';

import "./TestNewView.css";

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
        <div className={classes.root}>
            <Grid container spacing={2}  className="white-background">
                    <Grid item xs={10}>
                        {/* Header Component */}
                        <h1 className="veggie-header">Veggie Challenge</h1>
                    </Grid>
                    <Grid item xs={2}>
                        <h4 className="veggie-menu">Menu</h4>
                        {/* Menu Component */}
                    </Grid>
            </Grid>
            <Grid container spacing={2}className="dark-box">
                <Grid item xs={12} >
                    <p>dark box</p>
                </Grid>
            </Grid>
            <Grid container spacing={2} className="veggie-footer-parent">
                <Grid item xs={12}>
                    <footer className="veggie-footer">
                        Veggies
                    </footer>
                </Grid>
            </Grid>
        </div>
    );

}