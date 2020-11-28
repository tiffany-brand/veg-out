import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { DateTime } from 'luxon';

import { useStoreContext } from '../../state/GlobalState';

import IUser from '../../interfaces/IUser';
import INewChallenge from '../../interfaces/INewChallenge';
import IChallenge from '../../interfaces/IChallenge';

import userAPI from '../../utils/userAPI'
import challengesAPI from '../../utils/challengesAPI';

import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER, LOADING } from '../../state/actions';

import { Link, Redirect } from 'react-router-dom';

import Challenged from '../Challenged/Challenged';

import { endChallenge } from '../../utils/gameplayUtils/endChallenge';

import './Community.css';


function Community() {

    const [state, dispatch] = useStoreContext();

    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [searching, setSearching] = useState(false);

    const [value, setValue] = React.useState<IUser | null>(allUsers[0]);
    const [inputValue, setInputValue] = React.useState('');

    const [currentChallenge, setCurrentChallenge] = useState<IChallenge | undefined>()
    const [currentChallenger, setCurrentChallenger] = useState<IUser | undefined>()
    const [position, setPosition] = useState(1);

    const [isLoading, setIsLoading] = useState(true);


    // loads state from local storage if page is refreshed
    useEffect(() => {
        if (!state.currentUser._id) {
            const storedState = loadFromLocalStorage()
            dispatch({
                type: SET_CURRENT_USER,
                currentUser: storedState.currentUser
            });
        } else saveToLocalStorage(state);

        setIsLoading(false);

    }, [])



    if (isLoading) {
        return <div>Loading...</div>
    }


    // load users into Autocomplete to search for a challenger
    const loadUsers = () => {
        userAPI.getUsers()
            .then(res => {
                const challengers = res.data.filter((user: IUser) => !user.challenged && user._id !== state.currentUser._id)
                setAllUsers(challengers);
                setSearching(true);
            })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(JSON.stringify(value))
        const today = DateTime.local();
        const newChallenge = {
            playerOne: state.currentUser._id,
            playerTwo: value!._id,
            dateStarted: today.toFormat('yyyyLLdd'),
            dateEnding: today.plus({ days: 7 }).toFormat('yyyyLLdd'),
            playerOne_totalVeggies: [],
            playerOne_uniqueVeggies: [],
            playerOne_currentMultiplier: 1,
            playerOne_currentScore: 0,
            playerTwo_totalVeggies: [],
            playerTwo_uniqueVeggies: [],
            playerTwo_currentMultiplier: 1,
            playerTwo_currentScore: 0
        }

        // save the new challenge in the DB
        challengesAPI.saveChallenge(newChallenge)
            .then((res) => {
                console.log(res);
                setSearching(false);
                const challengeId = res.data._id;
                // set the current user to challenged
                const challengedUser = {
                    ...state.currentUser,
                    _id: state.currentUser._id,
                    challenged: true,
                    currentChallenge: challengeId
                }
                const challengerUser = {
                    ...value!,
                    _id: value!._id,
                    challenged: true,
                    currentChallenge: challengeId
                }
                Promise.all([userAPI.saveUser(challengedUser), userAPI.saveUser(challengerUser)])
                    .then(res => {
                        dispatch({
                            type: SET_CURRENT_USER,
                            currentUser: {
                                ...state.currentUser,
                                challenged: true,
                                currentChallenge: challengeId
                            }
                        })
                    }).then(res => {
                        return <Link to="/challenged"><Button variant="contained">View Challenge Stats</Button></Link>
                    })
            })
            .catch(err => console.log(err))

    }


    const isChallenged = () => {


        if (!searching) {

            return (
                <Grid item xs={12} container justify="space-around">
                    <div className="community-display">
                        {!state.currentUser.challenged && <div>
                            <Button variant="contained" onClick={() => loadUsers()}>Choose a New Challenger</Button>

                        </div>}

                        <Challenged />


                    </div>
                </Grid>
            )
        } else {

            return (

                <form>
                    <Autocomplete
                        id="challenger"
                        options={allUsers}
                        getOptionLabel={(option) => option.nickname}
                        renderInput={(params) => <TextField {...params} label="Choose a Challenger" variant="outlined" />}
                        value={value}
                        onChange={(event: any, newValue: IUser | null) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                    />

                    <Button variant="contained" disabled={!value} onClick={(e: any) => handleSubmit(e)}>Challenge!</Button>


                </form>

            )
        }


    }



    return (
        <div className="community-container">
            <h1>Challenges</h1>

            {isChallenged()}

        </div>
    )

}

export default withAuthenticationRequired(Community, {
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});