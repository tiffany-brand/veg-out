import React, { useEffect } from 'react';
import UpdateUsername from "../../components/UpdateUsername/UpdateUsername";
import Grid from '@material-ui/core/Grid';

import { useStoreContext } from '../../state/GlobalState';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { SET_CURRENT_USER } from '../../state/actions';

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
        <div className="my-profile">
            <h1>{state.currentUser.nickname}'s Profile</h1>
            <UpdateUsername />
        </div>
    );

};

export default MyProfile;