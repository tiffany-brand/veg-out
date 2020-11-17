import React from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Challenges.css';

export default function Challenges() {

  const pendingChallengesLI = ["Pending Challenge", "Another Pending", "Last Pender"];
  const currentChallengesLI = ["Current Challenge", "Another Current", "Last Current"];

  return (
    <div className="card-container">
      <div className="card-holder">
        <h2>PENDING CHALLENGES</h2>
        <DetailCard>
          <ul>
            {pendingChallengesLI.map(function (challenge, index) {
              return <li key={index}>{challenge}</li>
            })}
          </ul>
        </DetailCard>

      </div>
      <div className="user-data-holder">
        <UserData />
      </div>
      <div className="card-holder">
        <h2>CURRENT CHALLENGES</h2>
        <DetailCard>
          <ul>
            {currentChallengesLI.map(function (challenge, index) {
              return <li key={index}>{challenge}</li>
            })}
          </ul>
        </DetailCard>
      </div>
    </div>
  )

};