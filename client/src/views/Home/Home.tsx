import React, { useState, useEffect } from 'react';
import './Home.css';

// Global state and authorization utilities
import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER } from '../../state/actions';

// Plant logging functional component
import PlantLog from '../PlantLog/PlantLog';

// Structural imports
import DetailCard from '../../components/DetailCard/DetailCard';
import Grid from '@material-ui/core/Grid';

// User data and shape
import IUser from '../../interfaces/IUser'
import userAPI from '../../utils/userAPI'

function Home() {

  // Get global state and set local state
  const [state, dispatch] = useStoreContext();
  const [loggedInUser, setLoggedInUser] = useState<IUser>({
    email: "",
    auth0ID: "",
    _id: "",
    nickname: "",
    challenged: false,
    currentChallenge: "",
    wins: 0,
    losses: 0,
    ties: 0,
    lifetimeUniqueVeggies: [],
    lifetimeTotalVeggies: 0,
  });

  // Get logged in users states from the DB
  useEffect(() => {
    userAPI.getUser(state.currentUser._id)
      .then(res => setLoggedInUser(res.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep logged in user persistent using local storage 
  useEffect(() => {
    if (!state.currentUser._id) {
      const storedState = loadFromLocalStorage()
      dispatch({
        type: SET_CURRENT_USER,
        currentUser: storedState.currentUser
      })
    } else saveToLocalStorage(state);
  }, [])


  return (
    <div>
      <Grid item xs={12} container justify="space-around">
        <DetailCard>
          <div className="user-stats">
            <h3>{loggedInUser.nickname} Stats</h3>
            <h5>Plant Stats</h5>
            <ul>
              <li>Unique: {loggedInUser.lifetimeUniqueVeggies?.length} </li>
              <li>Total: {loggedInUser.lifetimeTotalVeggies}</li>
            </ul>
            <h5>Challenge Stats</h5>
            <ul>
              <li>Current Challenges: {loggedInUser.challenged ? "0" : "None"}</li>
              <li>Wins: {loggedInUser.wins}</li>
              <li>Losses {loggedInUser.losses}</li>
            </ul>
          </div>
        </DetailCard>

        <DetailCard>
          <div className="plant-log">
            <h3>Plant Log</h3>
            <PlantLog />
          </div>
        </DetailCard>
      </Grid>
    </div>
  )

};

export default Home;
