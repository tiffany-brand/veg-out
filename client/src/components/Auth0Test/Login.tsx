import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';


function Login() {

    const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div>
            <Link to="/">
                {!isLoading && !user && (
                    <>
                        <button onClick={loginWithRedirect}>
                            Log In
                    </button>
                    </>
                )}

                {!isLoading && user && (
                    <>
                        <button onClick={() => logout({ returnTo: window.location.origin })}>
                            Log Out
                    </button>
                    </>
                )}
            </Link>
            {isAuthenticated && (
                <Link to="/landing"><button>Go Inside</button></Link>
            )}
        </div>
    )


}
export default withRouter(Login);