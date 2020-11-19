import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Home.css';
import ICurrentUser from '../../interfaces/ICurrentUser'
import { useStoreContext } from '../../state/GlobalState';

import userAPI from '../../utils/userAPI'

export default function Home() {

  const [state, dispatch] = useStoreContext();

  // Set current user details in state
  const [userForNow, setUserForNow] = useState<ICurrentUser>({})
  // Gather the current user
  useEffect(() => {
    userAPI.getUser("452cea4a-1646-4d18-b807-49e5dee1b308")
      .then(res => {
        setUserForNow(res.data);

      })
  }, [])

  return (
    <div className="home-container">
      <h1>{userForNow.username} DETAILS</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>PLANT POWER</h2>
          <DetailCard>
            <ul>
              <li>TOTAL HP: {userForNow.currenthealth}</li>
              <li>OFFENSE: {userForNow.currentoffense}</li>
              <li>DEFENSE: {userForNow.currentdefense}</li>
            </ul>
          </DetailCard>

        </div>
        <div className="user-data-holder">
          <UserData />
        </div>
        <div className="card-holder">
          <h2>CHALLENGES</h2>
          <DetailCard level={userForNow.level} character={userForNow.firstName}>
            <ul>
              <li>RECORD: {userForNow.win} / {userForNow.loss}</li>
              <li>ACTIVE: {userForNow.currentChallenge}</li>
              <li><Link to="/community">+ NEW CHALLENGE +</Link></li>
            </ul>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};