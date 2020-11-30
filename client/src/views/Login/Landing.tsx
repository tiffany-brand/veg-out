import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
// import logo from '../../assets/images/Vegemon-logo.png';
import { useStoreContext } from '../../state/GlobalState';
import "./Landing.css";

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


function Landing(): JSX.Element {

    const { user } = useAuth0();
    const [state, dispatch] = useStoreContext();
    const classes = useStyles();

    useEffect(() => {
        console.log(state.currentUser);

    }, [])

    return (
        <>
            <Grid container justify="space-around" spacing={3} className="component-style">
                <Grid className="zero-out" item xs={12} md={6}>
                    <div className="dark-box">
                        <h1>Welcome to the landing page, {user.name}</h1>
                        <h2>User Object</h2>
                        <p>{JSON.stringify(user, null, 2)}</p>
                        <Link to="/"><button>Go Back</button></Link>
                    </div>
                </Grid>

            </Grid>
        </ >
    );

}

// to protect a route, use the withAuthenticationRequired higher order function
// if not logged in when hitting this route, user will be redirected to login page

export default withAuthenticationRequired(Landing, {
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});