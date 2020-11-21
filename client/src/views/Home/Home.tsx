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
  const [loggedInUser, setLoggedInUser] = useState<ICurrentUser>({});

  useEffect(() => {
    userAPI.getUser(state.currentUser._id)
      .then(res => setLoggedInUser(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="home-container">
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
          <UserData level={loggedInUser.level} character_image={loggedInUser.character_image} />
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
    </div>
  )

};