import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import userAPI from '../../utils/userAPI';
import { useStoreContext } from '../../state/GlobalState';
import logo from '../../assets/images/Vegemon-logo.png';
import { LOADING, SET_CURRENT_USER } from '../../state/actions';

function Login(): JSX.Element {

    const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        // if a user is logged in, check to see if they are in our db
        if (user) {
            userAPI.getAuthUser(user.sub)
                .then(res => {
                    if (res.data === "") {
                        // if no user found, create new user in db, then set state
                        userAPI.saveUser({ email: user.email, auth0ID: user.sub })
                            .then(res => {
                                dispatch({ type: LOADING });
                                dispatch({
                                    type: SET_CURRENT_USER,
                                    currentUser: {
                                        _id: res.data._id,
                                        email: res.data.email,
                                        auth0ID: res.data.auth0ID
                                    }
                                })
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log("user found")
                        // if user found, set state for logged in user
                        dispatch({ type: LOADING });
                        dispatch({
                            type: SET_CURRENT_USER,
                            currentUser: {
                                _id: res.data._id,
                                email: res.data.email,
                                auth0ID: res.data.auth0ID,
                                username: res.data.username
                            }
                        })

                    }
                })
                .catch(err => console.log(err));

            console.log(state.currentUser);
        }
    }, [])

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
                <Link to="/home"><button>Go Inside</button></Link>
            )}
        </div>
    )


}
export default Login;