import React, { useEffect } from 'react';
import UpdateUsername from "../../components/UpdateUsername/UpdateUsername";
import Grid from '@material-ui/core/Grid';

import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { SET_CURRENT_USER } from '../../state/actions';

import "./MyProfile.css";

function MyProfile() {

    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        if (!state.currentUser._id) {
          const storedState = loadFromLocalStorage();
          dispatch({
            type: SET_CURRENT_USER,
            currentUser: storedState.currentUser
          });
        } else saveToLocalStorage(state);
      }, []);
      console.log(state.currentUser);

    return (
        <div className="dark-box">
          <Grid item xs={12} container className="component-style" justify="space-around">
            <Grid item xs={12} md={8}>
              <h1>{state.currentUser.nickname}'s Profile</h1>
              <UpdateUsername />
            </Grid>
          </Grid>
        </div>
    );

};

export default MyProfile;