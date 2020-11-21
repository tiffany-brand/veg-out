import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Home.css';
import ICurrentUser from '../../interfaces/ICurrentUser'
import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER, SET_CHALLENGES } from '../../state/actions';

import userAPI from '../../utils/userAPI'

function Home() {

  const [state, dispatch] = useStoreContext();

  console.log(JSON.stringify(state.currentUser.username));

  console.log(JSON.stringify(state.currentUser));


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
    <div className="home-container">
      <h1>{state.currentUser.username} DETAILS</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>PLANT POWER</h2>
          <DetailCard>
            <ul>
              <li>TOTAL HP: {state.currentUser.currenthealth}</li>
              <li>OFFENSE: {state.currentUser.currentoffense}</li>
              <li>DEFENSE: {state.currentUser.currentdefense}</li>
            </ul>
          </DetailCard>

        </div>
        <div className="user-data-holder">
          <UserData level={state.currentUser.level} character_image={state.currentUser.character_image} />
        </div>
        <div className="card-holder">
          <h2>CHALLENGES</h2>
          <DetailCard>
            <ul>
              <li>RECORD: {state.currentUser.win} / {state.currentUser.loss}</li>
              <li>ACTIVE: {state.currentUser.currentChallenge}</li>
              <li><Link to="/community">+ NEW CHALLENGE +</Link></li>
            </ul>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};

export default withAuthenticationRequired(Home, {
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});