import React from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Home.css';
import { useStoreContext } from '../../state/GlobalState';

import userAPI from '../../utils/userAPI'

export default function Home() {

  const [state, dispatch] = useStoreContext();

  console.log(JSON.stringify(state.currentUser.username));

  console.log(JSON.stringify(state.currentUser));


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