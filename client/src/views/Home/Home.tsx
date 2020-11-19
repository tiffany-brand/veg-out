import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Home.css';
import ICurrentUser from '../../interfaces/ICurrentUser'
import { useStoreContext } from '../../state/GlobalState';

import CharacterAPI from '../../utils/playercharacterAPI'
import API from '../../utils/userAPI'

const testCharacterAPI = {
  _id: "2457658i",
  currenthealth: 45,
  currentoffense: 56,
  currentdefense: 67,
  challenged: false,
  character_name: "ron"
};

const challengeData = {
  wins: 17,
  losses: 6,
  active: 4
};

export default function Home() {

  const [state, dispatch] = useStoreContext();
  console.log(state.currentUser.auth0ID);
  console.log(state.currentUser);

  console.log(state.currentUser.username);

  // const [userData, setUserData] = useState<ICurrentUser>()

  // useEffect(() => {
  //   API.getAuthUser(auth0ID)
  //     .then(res => {

  //       setUserData(res.data)
  //     }
  //     );
  // }, []);

  // useEffect(() => {

  // }, []);


  return (
    <div className="home-container">
      <h1>{state.currentUser.username} DETAILS</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>PLANT POWER</h2>
          <DetailCard>
            <ul>
              <li>TOTAL HP: {testCharacterAPI.currenthealth}</li>
              <li>OFFENSE: {testCharacterAPI.currentoffense}</li>
              <li>DEFENSE: {testCharacterAPI.currentdefense}</li>
            </ul>
          </DetailCard>

        </div>
        <div className="user-data-holder">
          <UserData />
        </div>
        <div className="card-holder">
          <h2>CHALLENGES</h2>
          <DetailCard>
            <ul>
              <li>RECORD: {challengeData.wins} / {challengeData.losses}</li>
              <li>ACTIVE: {challengeData.active}</li>
              <li><Link to="/community">+ NEW CHALLENGE +</Link></li>
            </ul>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};