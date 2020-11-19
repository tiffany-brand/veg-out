import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import logo from '../../assets/images/Vegemon-logo.png';
import { useStoreContext } from '../../state/GlobalState';


function Landing(): JSX.Element {

    const { user } = useAuth0();
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        console.log(state.currentUser);

    }, [])

    return (
        <div>
            <img width="300px" src={logo} alt="Vegemon" />
            <h1>Welcome to the landing page, {user.name}</h1>
            <img src={user.picture} alt={user.name} />
            <br></br>
            <h2>User Object</h2>
            <p>{JSON.stringify(user, null, 2)}</p>
            <Link to="/"><button>Go Back</button></Link>

        </div >
    );

}

// to protect a route, use the withAuthenticationRequired higher order function
// if not logged in when hitting this route, user will be redirected to login page

export default withAuthenticationRequired(Landing, {
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});