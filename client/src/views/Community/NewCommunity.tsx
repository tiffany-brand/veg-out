import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

import { DateTime } from 'luxon';

import { useStoreContext } from '../../state/GlobalState';

import IUser from '../../interfaces/IUser';
import INewChallenge from '../../interfaces/INewChallenge';

import userAPI from '../../utils/userAPI'
import challengesAPI from '../../utils/challengesAPI';

import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER } from '../../state/actions';


function NewCommunity() {

    const [state, dispatch] = useStoreContext();

    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [searching, setSearching] = useState(false);

    const [value, setValue] = React.useState<IUser | null>(allUsers[0]);
    const [inputValue, setInputValue] = React.useState('');

    useEffect(() => {
        if (!state.currentUser._id) {
            const storedState = loadFromLocalStorage()
            dispatch({
                type: SET_CURRENT_USER,
                currentUser: storedState.currentUser
            });
        } else saveToLocalStorage(state);
    }, [])

    const loadUsers = () => {
        userAPI.getUsers()
            .then(res => {
                setAllUsers(res.data);
                setSearching(true);
            })
    }

    const handleSubmit = () => {
        console.log(JSON.stringify(value))
        const today = DateTime.local();
        const newChallenge = {
            playerOne: state.currentUser._id,
            playerTwo: value!._id,
            dateStarted: today.toFormat('yyyyLLdd'),
            dateEnding: today.plus({ days: 7 }).toFormat('yyyyLLdd')
        }
        console.log(newChallenge)
        // save the new challenge in the DB
        challengesAPI.saveChallenge(newChallenge)
            .then((res) => {
                console.log(res);
                setSearching(false);
                // set the current user to challenged
                userAPI.saveUser({
                    _id: state.currentUser._id,
                    challenged: true
                })
                    // set the challenged user to challenged
                    .then((res) => {
                        console.log(res)
                        userAPI.saveUser({
                            _id: value!._id,
                            challenged: true
                        })
                            .then((res) => console.log(res))
                    })
            })
            .catch(err => console.log(err))


    }

    useEffect(() => {

    }, [])

    return (
        <div className="community-container">
            <h1>Challenges</h1>
            {/* If currently in a challenge, show challenge info */}
            {!state.currentUser.challenged &&

                <p>Put already challenged component here</p>

            }
            {!searching ?
                <Button variant="contained" onClick={() => loadUsers()}>Choose a Challenger</Button> :
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
                    <Button variant="contained" onClick={handleSubmit}>Challenge!</Button>
                </form>}

        </div>
    )




}

export default withAuthenticationRequired(NewCommunity, {
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});