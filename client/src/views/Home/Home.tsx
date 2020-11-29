import React, { useState, useEffect } from 'react';
import './Home.css';

// Global state and authorization utilities
import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { SET_CURRENT_USER } from '../../state/actions';

// Plant logging functional component
import PlantLog from '../PlantLog/PlantLog';

// Structural imports
import DetailCard from '../../components/DetailCard/DetailCard';
import Grid from '@material-ui/core/Grid';

function Home() {

  // Get global state and set local state
  const [state, dispatch] = useStoreContext();

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
      <h2 className="view-title">{state.currentUser.nickname} Stats</h2>
      <Grid item xs={12} container className="component-style" justify="space-around">
        <DetailCard>
          <div className="user-stats detail-helper">
            <h5>Plant Stats</h5>
            <ul>
              <li>Unique: {state.currentUser.lifetimeUniqueVeggies?.length} </li>
              <li>Total: {state.currentUser.lifetimeTotalVeggies}</li>
            </ul>
            <h5>Challenge Stats</h5>
            <ul>
              <li>Current Challenges: {state.currentUser.challenged ? "1" : "None"}</li>
              <li>Wins: {state.currentUser.wins}</li>
              <li>Losses {state.currentUser.losses}</li>
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
