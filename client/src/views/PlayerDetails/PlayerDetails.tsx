import React from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './PlayerDetail.css';
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

  const [state, dispatch] = useStoreContext();

  return (
    <div className="player-details-container">
      <h1>Challenger Details</h1>
      <div className="card-container">
        <div className="user-data-holder">
          <UserData level={state.currentUser.level} character_image={state.currentUser.character_image} />
        </div>
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