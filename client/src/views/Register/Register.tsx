import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
// import Button from "@material-ui/core/Button";

import { useStoreContext } from '../../state/GlobalState';


// ***** REMEMBER TO REMOVE *****
//Import User Array for testing
import { userList } from '../../utils/testUserArray'
import CharacterCarousel from '../../components/CharacterCarousel/CharacterCarousel';
import characterAPI from '../../utils/createCharacterChoiceAPI';

export default function Register() {

  const [state, dispatch] = useStoreContext();
  console.log(`This is the global state ${JSON.stringify(state.currentUser)}`);


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


  // character selection

  const commitCharacterChoice = () => {

    console.log(characterAPI.getCharacterChoices);
  };



  return (
    <div className="register-container">
      <h1>USERNAME/CHARACTER REGISTRATION</h1>
      <CharacterCarousel onChange={commitCharacterChoice} />

    </div>
  )
}
