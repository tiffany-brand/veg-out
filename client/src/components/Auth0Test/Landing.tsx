import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import logo from '../../assets/images/Vegemon-logo.png';


function Landing(): JSX.Element {

    const { user } = useAuth0();

    return (
        <div>
            <img width="300px" src={logo} />
            <h1>Welcome to the landing page, {user.name}</h1>
            <img src={user.picture} />
            <br></br>
            <h2>User Object</h2>
            <p>{JSON.stringify(user, null, 2)}</p>
            <Link to="/"><button>Go Back</button></Link>

        </div >
    );

}
export default withRouter(Landing)