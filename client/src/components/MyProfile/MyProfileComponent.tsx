import React, { useState, useEffect } from 'react';

import { useStoreContext } from '../../state/GlobalState';
// import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { SET_CURRENT_USER } from '../../state/actions';

import userAPI from '../../utils/userAPI';

import IUser from "../../interfaces/IUser";

const MyProfileComponent: React.FC = () => {

  const [state, dispatch] = useStoreContext();
  const [input, setInput] = useState("");

  useEffect(() => {
    Promise.all([userAPI.getUser(state.currentUser._id)])
      .then(([userRes]) => {})
  }, []);

  const updateNickname = () => {
      userAPI.saveUser({ ...state.currentUser}).then(res => {
          dispatch({
              type: SET_CURRENT_USER,
              currentUser: res.data
          })
      })
  }

  return (
    <div>My Profile Settings</div>
  );

};

export default MyProfileComponent;