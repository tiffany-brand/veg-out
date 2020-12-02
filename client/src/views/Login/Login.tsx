import React, { useEffect } from "react";
import './Login.css'
import { useAuth0 } from '@auth0/auth0-react';
import userAPI from '../../utils/userAPI';
import { useStoreContext } from '../../state/GlobalState';
import logo from '../../assets/images/stroked-vedgeIn-logo-1200.png';
import { LOADING, SET_CURRENT_USER } from '../../state/actions';
import { saveToLocalStorage } from '../../utils/persistUser';
import Home from '../Home/Home';

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
                        userAPI.saveUser({
                            email: user.email,
                            auth0ID: user.sub,
                            nickname: user.nickname,

                        })
                            .then(res => {
                                const { _id,
                                    email, auth0ID, nickname, challenged, currentChallenge, wins, losses, ties, lifetimeUniqueVeggies, lifetimeTotalVeggies
                                } = res.data;
                                dispatch({ type: LOADING });
                                dispatch({
                                    type: SET_CURRENT_USER,
                                    currentUser: {
                                        ...state.currentUser,
                                        _id,
                                        email,
                                        auth0ID,
                                        nickname,
                                        challenged,
                                        currentChallenge,
                                        wins,
                                        losses,
                                        ties,
                                        lifetimeUniqueVeggies,
                                        lifetimeTotalVeggies
                                    }
                                })
                            })
                            .catch(err => console.log(err));
                    } else {

                        const { _id,
                            email, auth0ID, nickname, challenged, currentChallenge, wins, losses, ties, lifetimeUniqueVeggies, lifetimeTotalVeggies
                        } = res.data;
                        // if user found, set state for logged in user
                        dispatch({ type: LOADING });
                        dispatch({
                            type: SET_CURRENT_USER,
                            currentUser: {
                                ...state.currentUser,
                                _id,
                                email,
                                auth0ID,
                                nickname,
                                challenged,
                                currentChallenge,
                                wins,
                                losses,
                                ties,
                                lifetimeUniqueVeggies,
                                lifetimeTotalVeggies

                            }
                        })

                    }
                })
                .catch(err => console.log(err));



        }
    }, [])

    useEffect(() => {
        saveToLocalStorage(state);
    }, [state])

    return (
        <div>
            {!isAuthenticated && <div>
                <div className="splash-container">
                    <div className="splash-screen">
                        <img className="splash-logo" src={logo} alt="Vedge-In logo" />

                        <p></p>

                        <button className="splash-button" onClick={loginWithRedirect}> Log In &#8594; </button>

                    </div>
                </div>
            </div>}

            {isAuthenticated && <Home />}

        </div>

    )


}
export default Login;