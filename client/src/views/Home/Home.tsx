import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Home.css';
import ICurrentUser from '../../interfaces/ICurrentUser'
import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER, SET_CHALLENGES } from '../../state/actions';

import PlantLogSearch from '../KeithTestGrid/TestSort';

import Grid from '@material-ui/core/Grid';

import userAPI from '../../utils/userAPI'

function Home() {

  const [state, dispatch] = useStoreContext();
  const [loggedInUser, setLoggedInUser] = useState<ICurrentUser>({});

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


  console.log(loggedInUser.character_name);
  return (
    <div>
      <Grid item xs={12} container justify="space-around">
        <DetailCard>
          <ul>
            <li>TOTAL HP: {loggedInUser.currenthealth}</li>
            <li>OFFENSE: {loggedInUser.currentoffense}</li>
            <li>DEFENSE: {loggedInUser.currentdefense}</li>
          </ul>
        </DetailCard>
        <DetailCard>
          <PlantLogSearch />

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