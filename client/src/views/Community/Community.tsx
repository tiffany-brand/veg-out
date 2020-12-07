import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { DateTime } from 'luxon';

import { useStoreContext } from '../../state/GlobalState';

import IUser from '../../interfaces/IUser';

import userAPI from '../../utils/userAPI'
import challengesAPI from '../../utils/challengesAPI';

import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER } from '../../state/actions';

import { Link } from 'react-router-dom';

import Challenged from '../Challenged/Challenged';

import './Community.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        textfield: {
            border: "1px solid #fff"
        }
    }),
);


function Community() {
    const classes = useStyles();

    const [state, dispatch] = useStoreContext();

    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [searching, setSearching] = useState(false);

    const [value, setValue] = React.useState<IUser | null>(allUsers[0]);
    const [inputValue, setInputValue] = React.useState('');

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

    }, [])

    // load users for challenger choice input
    useEffect(() => {

        userAPI.getUsers()
            .then(res => {
                const challengers = res.data.filter((user: IUser) => !user.challenged && user._id !== state.currentUser._id)
                setAllUsers(challengers);
                setValue(allUsers[0]);
                setIsLoading(false)
            })

    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }


    // show the search box
    const loadUsers = () => {
        setValue(allUsers[0]);
        setSearching(true);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const today = DateTime.local();
        const newChallenge = {
            playerOne: state.currentUser._id,
            playerTwo: value!._id,
            dateStarted: today.plus({ days: 1 }).toFormat('yyyyLLdd'),
            dateEnding: today.plus({ days: 8 }).toFormat('yyyyLLdd'),
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

                setSearching(false);
                setIsLoading(true)
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
                        setIsLoading(false)
                        return <Link to="/challenged"><Button variant="contained">View Challenge Stats</Button></Link>
                    })
            })
            .catch(err => console.log(err))

    }


    const isChallenged = () => {


        if (!searching) {

            return (
                <div className="community-display component-style">
                    {!state.currentUser.challenged && <div>
                        <Button variant="contained" onClick={() => loadUsers()}>Start a New Challenge</Button>

                    </div>}

                    {/* Display current challenge and/or past challenges */}
                    <Challenged />

                </div>
            )
        } else if (allUsers[0]) {

            return (
                // If searching, display the challenger search input
                <form className="challenge-form">
                    <Autocomplete
                        id="challenger"
                        options={allUsers}
                        getOptionLabel={(option) => option.email}
                        renderInput={(params) => <TextField {...params} label="Search Challengers" variant="outlined" className={classes.textfield} />}
                        value={value || allUsers[0]}
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
        <div>
            <h2 className="view-title">{state.currentUser.nickname}'s Challenges</h2>

            <div className="community-dark-box">
                <Grid item xs={12} container className="component-style" justify="space-around">
                    <Grid item xs={12} md={8}>

                        {isChallenged()}

                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default withAuthenticationRequired(Community, {
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});