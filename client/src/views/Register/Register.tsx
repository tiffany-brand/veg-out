import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

// ***** REMEMBER TO REMOVE *****
//Import User Array for testing
import { userList } from '../../utils/testUserArray'

export default function Register() {

  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false);
  const [usernameConfirmArea, setUsernameConfirmArea] = useState<string>("Username can not be blank.");
  const [newUsername, setNewUsername] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeSearch = event.target.value
    const matchSearch = userList.filter((el) => (
      el.userName?.toLowerCase().includes(activeSearch.toLowerCase())
    ))


    if (!activeSearch || activeSearch === " ") {
      setUsernameConfirmArea("Username can not be blank.");
      return;
    }

    if (activeSearch.length < 4) {
      setUsernameConfirmArea("Username must be greater than 3 characters.")
      return;
    }

    if (matchSearch.length > 0) {
      setUsernameAvailable(false);
      setUsernameConfirmArea(`${activeSearch} is NOT available.`);
    }

    if (matchSearch.length === 0) {
      setUsernameAvailable(true);
      setUsernameConfirmArea(`${activeSearch} is available.`);
      setNewUsername(activeSearch);
    }

  };

  const commitUsername = () => {
    console.log(newUsername);

  };

  return (
    <div className="register-container">
      <h1>USERNAME/CHARACTER REGISTRATION</h1>
      <div className="register-inputs">
        <input onChange={handleInputChange} type="text" name="user-name" placeholder="Enter Username" />
        <div className="username-confirm">
          {usernameConfirmArea}
        </div>
        <Link to="/character-selection">
          <button disabled={!usernameAvailable} onClick={commitUsername}>CONFIRM</button>
        </Link>
      </div>
    </div>
  )
}