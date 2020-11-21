import React from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Home.css';
import { useStoreContext } from '../../state/GlobalState';

const plantPowerData = {
  totalHP: 345,
  offensePower: 498,
  defensePower: 546
};

const challengeData = {
  wins: 17,
  losses: 6,
  active: 4
};

export default function Home() {

  const [state] = useStoreContext();
  console.log(state.currentUser.auth0ID);
  console.log(state.currentUser);

  console.log(state.currentUser.username);

  return (
    <div className="home-container">
      <h1>{state.currentUser.username} DETAILS</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>PLANT POWER</h2>
          <DetailCard>
            <ul>
              <li>TOTAL HP: {plantPowerData.totalHP}</li>
              <li>OFFENSE: {plantPowerData.offensePower}</li>
              <li>DEFENSE: {plantPowerData.defensePower}</li>
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