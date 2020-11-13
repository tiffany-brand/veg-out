import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../../assets/images/Vegemon-logo.png';

function Login(): JSX.Element {

    const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div>
            <img width="500px" src={logo} alt="Vegemon" />
            <br></br>
            <Link to="/">
                {/* If not logged, show the Log In button */}
                {!isLoading && !user && (
                    <>
                        <button onClick={loginWithRedirect}>
                            Log In
                        </button>
                    </>
                )}

                {/* If logged in, show the Log Out button  */}
                {!isLoading && user && (
                    <>
                        <button onClick={() => logout({ returnTo: window.location.origin })}>
                            Log Out
                        </button>
                    </>
                )}
            </Link>
            {/* If logged in, show the button to go inside the app to the protected route */}
            {isAuthenticated && (
                <Link to="/landing"><button>Go Inside</button></Link>
            )}
        </div>
    )


}
export default Login;