import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import logo from '../../assets/images/Vegemon-logo.png';
import { useStoreContext } from '../../state/GlobalState';

import IChallNew from '../../interfaces/IChallNew';
import challengesAPI from '../../utils/challengesAPI';
import { DateTime } from 'luxon';


import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';

import { SET_CURRENT_USER, SET_CHALLENGES } from '../../state/actions';


function Landing(): JSX.Element {

    const { user } = useAuth0();
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        if (!state.currentUser._id) {
            const storedState = loadFromLocalStorage()
            dispatch({
                type: SET_CURRENT_USER,
                currentUser: storedState.currentUser
            });
            dispatch({
                type: SET_CHALLENGES,
                challenges: storedState.challenges
            })
        } else saveToLocalStorage(state);
    }, [])

    const seedAChallenge = () => {

        const today = DateTime.local()
        const start = today.toFormat('yyyyLLdd');
        const end = today.plus({ days: 7 }).toFormat('yyyyLLdd');
        console.log(end)
        let challSeed = {
            date_started: start,
            playerOne_id: state.currentUser._id,
            playerTwo_id: "d9ffa64f-e954-4b2b-8a9a-3f4532d0d896",
            date_ending: end
        }
        console.log(challSeed);
        challengesAPI.saveChall(challSeed)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        seedAChallenge()
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

            <div>

            </div>



        </div >
    );

}

// to protect a route, use the withAuthenticationRequired higher order function
// if not logged in when hitting this route, user will be redirected to login page

export default withAuthenticationRequired(Landing, {
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});