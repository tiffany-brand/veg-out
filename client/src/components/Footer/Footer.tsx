import React from 'react';

import "./Footer.css";
import Grid from '@material-ui/core/Grid';

export default function Footer() {

  return (
    <div>
      <Grid container spacing={2} className="veggie-footer-parent">
        <Grid item xs={12}>
          <footer className="veggie-footer">Veggies
          </footer>
        </Grid>
      </Grid>
    </div>
  );
}