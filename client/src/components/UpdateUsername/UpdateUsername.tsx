import React, { useState, useEffect } from 'react';

import { useStoreContext } from '../../state/GlobalState';
import { SET_CURRENT_USER } from '../../state/actions';

import userAPI from '../../utils/userAPI';

const UpdateUsername: React.FC = () => {

  const [state, dispatch] = useStoreContext();
  const [input, setInput] = useState("");

  useEffect(() => {
    Promise.all([userAPI.getUser(state.currentUser._id)])
      .then(([userRes]) => {
        console.log(userRes.data)
      })
  }, []);

  const updateNickname = () => {
      userAPI.saveUser({ ...state.currentUser, nickname: input}).then(res => {
          dispatch({
              type: SET_CURRENT_USER,
              currentUser: res.data
          })
      })
  }

  return (
    <>
      <label>Username</label>
      <input onChange={event => setInput(event.target.value)} placeholder={state.currentUser.nickname}></input>
      <button onClick={updateNickname}>Update</button>
    </>
  );

};



export default UpdateUsername;