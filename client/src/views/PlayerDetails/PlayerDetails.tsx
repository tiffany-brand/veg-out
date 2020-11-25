import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import userAPI from '../../utils/userAPI';
import ICurrentUser from '../../interfaces/ICurrentUser';
import './PlayerDetail.css';
import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER, SET_CHALLENGES } from '../../state/actions';


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

type Props = {
  id: string
}

// needs to take an id as props
// props: Props

function PlayerDetails() {
  const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const id = "2712c5c1-2a4d-4ee7-8ff9-f42fafe633fd";

  const [player, setPlayer] = useState<ICurrentUser>({});

  useEffect(() => {
    // use props.id when linking in sending page
    userAPI.getUser(id)
      .then(res => {
        setPlayer(res.data);
      })
      .catch(err => console.log(err))


  }, []);

  const [state, dispatch] = useStoreContext();

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
    <div className="player-details-container">
      <h1>{player.username} Details</h1>
      <div className="card-container">
        <div className="user-data-holder">
          {/* <UserData level={state.currentUser.level} character_name={state.currentUser.character_name} /> */}
        </div>
        <div className="card-holder">
          <h2>PLANT POWER</h2>
          <DetailCard>
            <ul>
              <li>TOTAL HP: {player.currenthealth}</li>
              <li>OFFENSE: {player.currentoffense}</li>
              <li>DEFENSE: {player.currentdefense}</li>
            </ul>
          </DetailCard>

        </div>
        <div className="card-holder">
          <h2>CHALLENGES</h2>
          <DetailCard>
            <ul>
              <li>RECORD: {player.win} / {player.loss}</li>
              {/* <li>ACTIVE: {challengeData.active}</li> */}
              <li><Link to="/community">+ NEW CHALLENGE +</Link></li>
            </ul>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};

export default withAuthenticationRequired(PlayerDetails, {
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});