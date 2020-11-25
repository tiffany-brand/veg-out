import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Home.css';
import IUser from '../../interfaces/IUser'
import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER, SET_CHALLENGES } from '../../state/actions';

import PlantLogSearch from '../KeithTestGrid/TestSort';

import Grid from '@material-ui/core/Grid';

import userAPI from '../../utils/userAPI'

function Home() {

  const [state, dispatch] = useStoreContext();
  const [loggedInUser, setLoggedInUser] = useState<IUser>({
    email: "",
    auth0ID: "",
    _id: "",
    nickname: "",
    challenged: false,
    currentChallenge: "",
    wins: 0,
    losses: 0,
    ties: 0,
    lifetimeUniqueVeggies: [],
    lifetimeTotalVeggies: [],
  });

  useEffect(() => {
    userAPI.getUser(state.currentUser._id)
      .then(res => setLoggedInUser(res.data))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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


  return (
    <div>
      <Grid item xs={12} container justify="space-around">
        <DetailCard>
          <div className="user-stats">
            <h3>{loggedInUser.nickname} Stats</h3>
            <h5>Plant Stats</h5>
            <ul>
              <li>Unique: {loggedInUser.lifetimeUniqueVeggies?.length} </li>
              <li>Total: {loggedInUser.lifetimeTotalVeggies?.length}</li>
            </ul>
            <h5>Challenge Stats</h5>
            <ul>
              <li>Current Challenges: {loggedInUser.challenged ? "0" : "None"}</li>
              <li>Wins: {loggedInUser.wins}</li>
              <li>Losses {loggedInUser.losses}</li>
            </ul>
          </div>
        </DetailCard>
        <DetailCard>
          <div className="plant-log">
            <h3>Plant Log</h3>
            <PlantLogSearch />
          </div>

        </DetailCard>

      </Grid>

    </div>
  )

};

export default withAuthenticationRequired(Home, {
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});

{/* <div className="home-container">
      <h1>{state.currentUser.username} DETAILS</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>PLANT POWER</h2>
          <DetailCard>
            <ul>
              <li>TOTAL HP: {loggedInUser.currenthealth}</li>
              <li>OFFENSE: {loggedInUser.currentoffense}</li>
              <li>DEFENSE: {loggedInUser.currentdefense}</li>
            </ul>
          </DetailCard>

        </div>
        <div className="user-data-holder">
          <UserData level={loggedInUser.level} character_name={loggedInUser.character_name} />
        </div>
        <div className="card-holder">
          <h2>CHALLENGES</h2>
          <DetailCard>
            <ul>
              <li>RECORD: {loggedInUser.win} / {loggedInUser.loss}</li>
              <li>ACTIVE: {loggedInUser.currentChallenge}</li>
              <li><Link to="/community">+ NEW CHALLENGE +</Link></li>
            </ul>
          </DetailCard>
        </div>
      </div>
    </div> */}

// <Grid item xs={12} container justify="space-around">
//   <Grid item xs={8} sm={4}>
//     <div className="veggie-box"><ul>
//       <li>TOTAL HP: {loggedInUser.currenthealth}</li>
//       <li>OFFENSE: {loggedInUser.currentoffense}</li>
//       <li>DEFENSE: {loggedInUser.currentdefense}</li>
//     </ul></div>
//   </Grid>
//   <Grid item xs={8} sm={4}>
//     <div className="veggie-box"> <ul>
//       <li>RECORD: {loggedInUser.win} / {loggedInUser.loss}</li>
//       <li>ACTIVE: {loggedInUser.currentChallenge}</li>
//       <li><Link to="/community">+ NEW CHALLENGE +</Link></li>
//     </ul></div>
//   </Grid>
// </Grid>