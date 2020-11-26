import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import DetailCard from '../../components/DetailCard/DetailCard';
import ICurrentUser from '../../interfaces/ICurrentUser';
import IChallenges from '../../interfaces/IChallenges';
import userAPI from '../../utils/userAPI';
import challengesAPI from '../../utils/challengesAPI';
import {useStoreContext} from '../../state/GlobalState';
import {DateTime} from 'luxon';
import {SET_CHALLENGES, SET_CURRENT_USER} from '../../state/actions';
import { Link } from 'react-router-dom';
import './Community.css';

const d = DateTime.local()

const date = DateTime.local().toFormat('yyyyLLdd');
const week =  DateTime.local().plus({days: 5}).toISODate();




export default function Community() {

  const [searchArray, setSearchArray] = useState<ICurrentUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allUsers, setAllUsers] = useState<ICurrentUser[]>([])

  //As user types populate search results
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeSearch = event.target.value.toLowerCase()
    const currentSearch = allUsers.filter((el) => (
      el.username?.toLowerCase().includes(activeSearch)
    ))
    setSearchArray(currentSearch)
    setSearchTerm(activeSearch);
  };

  const [state, dispatch] = useStoreContext();

  function startChal(opp:any){

  if (state.currentUser.challenged===false){
    const opponent = opp;
   
    const challenge={

      _id:"",
     //Need to include empty _id string to let state allow holding that data later
      date_started: date,
      date_ending:week,
      player_one: state.currentUser._id,
      player_two: opponent._id,
      player_one_health:100,
      player_one_defense:100,
      player_one_offense:100,
      player_one_plantTotal:0,
      player_two_health:100,
      player_two_defense:100,
      player_two_offense:100,
      player_two_plantTotal:0
      
    };


    challengesAPI.saveChallenge(challenge)
    .then(res=> {

      dispatch({
        type: SET_CHALLENGES,
        challenges: {
          ...state.challenges,
          ...res.data
        }
      });
      dispatch({
        type: SET_CURRENT_USER,
        currentUser: {
          ...state.currentUser,
          challenged: true,
          currentChallenge: res.data._id
        }
      });

      userAPI.saveUser({ ...state.currentUser, challenged:true, currentChallenge:res.data._id });


      alert("New Challenge Has Begun!");
     
    }).catch(err=> console.log(err));
      
    

  }
else {
  alert("Please complete your current challenge before starting a new one!")
  }

}


  useEffect(() => {
    userAPI.getUsers()
      .then(res => {
        setAllUsers(res.data);

      })
  }, [])

  return (
    <div className="community-container">
      <h1>COMMUNITY</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>Recent Opponents</h2>
          <DetailCard>
            <ul>
              {allUsers.slice(0, 5).map(function (member, index) {
                return <li key={index}> {member.username}</li>
              })}
            </ul>
          </DetailCard>
        </div>
        <div className="card-holder">
          <h2>FIND NEW CHALLENGERS</h2>
          <DetailCard>
            <h3>- Search Opponents -</h3>
            <input onChange={handleInputChange} type="text" name="user-name" placeholder="Enter Username" value={searchTerm} />
            <div className="search-results" id="search-results">{searchArray.slice(0, 3).map(function (user, index) {
              return <p key={index}>{user.username}  <button onClick={()=>startChal(user)}>+</button> </p>
            })}</div>
          </DetailCard>
=======

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

import ChallengeDisplay from '../../components/ChallengeDisplay/ChallengeDisplay';


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
        console.log(newChallenge)
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
                    <div>
                        {!state.currentUser.challenged && <Button variant="contained" onClick={() => loadUsers()}>Choose a Challenger</Button>}
                        {state.currentUser.challenged && <div>
                            <h2>Challenge In Progress</h2>
                            <Link to="/challenged"><Button variant="contained">View Challenge Stats</Button></Link>
                        </div>}

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

>>>>>>> fb2d617f90dc6784f1f10184af64232c48f7b1d4
        </div>
    )

}

export default withAuthenticationRequired(Community, {
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});