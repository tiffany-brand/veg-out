import React, { useState, useEffect } from 'react';
import './Home.css';

// Global state and authorization utilities
import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { SET_CURRENT_USER } from '../../state/actions';

// Plant logging functional component
import PlantLog from '../../components/PlantLog/PlantLog';

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

  console.log(state.currentUser.lifetimeUniqueVeggies);


  return (
    <div className="home-screen">
      <h2 className="view-title">{state.currentUser.nickname} Stats</h2>
      <div className="home-dark-box">
        <Grid item xs={12} container className="component-style" justify="space-around">
          <Grid className="zero-out" item xs={12} md={6}>
            <div className="user-stats">
              <h3 className="underlined-header">Plant Stats</h3>
              <div className="list-container">
                <ul>
                  <li>Unique: {state.currentUser.lifetimeUniqueVeggies ? state.currentUser.lifetimeUniqueVeggies.length : "0"} </li>
                  <li>Total: {state.currentUser.lifetimeTotalVeggies}</li>
                </ul>
              </div>
              <h3 className="underlined-header">Challenge Stats</h3>
              <div className="list-container">
                <ul>
                  <li>Current: {state.currentUser.challenged ? "1" : "None"}</li>
                  <li>Wins: {state.currentUser.wins}</li>
                  <li>Losses {state.currentUser.losses}</li>
                </ul>
              </div>
            </div>
          </Grid>
          <Grid className="zero-out" item xs={12} md={6}>
            <div className="plant-log">
              <h3 className="underlined-header">Plant Log</h3>
              <PlantLog />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )

};

export default Home;
