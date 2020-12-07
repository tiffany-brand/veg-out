import React, { useState, useEffect } from 'react';

import "./UpdateUsername.css";

import { useStoreContext } from '../../state/GlobalState';
import { SET_CURRENT_USER } from '../../state/actions';

import userAPI from '../../utils/userAPI';
import Alert from '@material-ui/lab/Alert';

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
    if (input.length > 5) {
      userAPI.saveUser({ ...state.currentUser, nickname: input}).then(res => {
          dispatch({
              type: SET_CURRENT_USER,
              currentUser: res.data
          })
      })
      console.log(`updateNickname ${input}`);
      console.log(`global state: ${state.currentUser.nickname}`)
    } else {
      console.log("failed");
    }
  }

  return (
    <div className="delete-div">
      <label>Username</label>
    <input onChange={event => setInput(event.target.value)} placeholder={state.currentUser.nickname}></input>
      <button className="green-button" onClick={updateNickname}>Update</button>
    </div>
  );

};



export default UpdateUsername;