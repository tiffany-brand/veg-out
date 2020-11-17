import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import userAPI from '../../utils/userAPI';
import logo from '../../assets/images/Vegemon-logo.png';

function Login(): JSX.Element {

    const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();


    const [email, setEmail] = useState("");
    const [auth0ID, setAuth0ID] = useState("")
    const [_id, set_id] = useState("")
    const [username, setUsername] = useState("")


    useEffect(() => {
        // if a user is logged in, check to see if they are in our db
        if (user) {
            userAPI.getAuthUser(user.sub)
                .then(res => {
                    if (res.data === "") {
                        // if no user found set state for user
                        console.log("no user found")
                        setEmail(user.email);
                        setAuth0ID(user.sub);
                        // and create new user in db
                        userAPI.saveUser({ email: user.email, auth0ID: user.sub })
                            .then(res => {
                                set_id(res.data._id)
                            })
                            .catch(err => console.log(err));
                    } else {
                        console.log("user found")
                        // set state for logged in user
                        setEmail(res.data.email);
                        setAuth0ID(user.sub);
                        set_id(res.data._id);
                    }

                })
                .catch(err => console.log(err));
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
                <Link to="/landing"><button>Go Inside</button></Link>
            )}
        </div>
    )


}
export default Login;