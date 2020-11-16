import React from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserDetails/UserData';
import './Home.css';

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

  return (
    <div className="challenges-container">
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
            <li>+ NEW CHALLENGE +</li>
          </ul>
        </DetailCard>
      </div>
    </div>
  )

};