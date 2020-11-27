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
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// User data and shape
import IUser from '../../interfaces/IUser'
import userAPI from '../../utils/userAPI'

function Home() {

  const [isLoading, setIsLoading] = useState(true);

  // Get global state and set local state
  const [state, dispatch] = useStoreContext();
  // const [loggedInUser, setLoggedInUser] = useState<IUser>({
  //   email: "",
  //   auth0ID: "",
  //   _id: "",
  //   nickname: "",
  //   challenged: false,
  //   currentChallenge: "",
  //   wins: 0,
  //   losses: 0,
  //   ties: 0,
  //   lifetimeUniqueVeggies: [],
  //   lifetimeTotalVeggies: 0,
  // });



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

  // Get logged in users states from the DB
  useEffect(() => {
    // const storedState = loadFromLocalStorage()
    // userAPI.getUser(state.currentUser._id || storedState.currentUser._id)
    //   .then(res => {
    //     setLoggedInUser(res.data)
    //     setIsLoading(false);
    //   })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <Grid item xs={12} container justify="space-around">
        <DetailCard>
          <div className="user-stats">
            <h3>{state.currentUser.nickname} Stats</h3>
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
