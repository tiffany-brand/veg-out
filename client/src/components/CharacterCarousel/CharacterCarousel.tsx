import React, { useState, useEffect} from 'react';
import CharacterArrow from '../CharacterArrow/CharacterArrow';
import CharacterSlide from '../CharacterSlide/CharacterSlide';
import "./CharacterCarousel.css";
import characterChoiceAPI from '../../utils/createCharacterChoiceAPI';
import userAPI from "../../utils/userAPI";
import { userList } from '../../utils/testUserArray';

import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import ICurrentUser from "../../interfaces/ICurrentUser";
import { useStoreContext } from '../../state/GlobalState';
import { Link } from 'react-router-dom';
import { SET_CHARACTER } from '../../state/actions';
import ICharacterResponse from '../../interfaces/ICharacterResponse';

import bunny from "../../svg/bunny.svg";


interface IProps {
    onChange: () => void
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    center: {
        textAlign: 'center',
        alignContent: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

const CharacterCarousel: React.FC<IProps> = () =>  {

  const classes = useStyles();

  const [state, dispatch] = useStoreContext();

  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false);
  const [usernameConfirmArea, setUsernameConfirmArea] = useState<string>("Username can not be blank.");
  const [newUsername, setNewUsername] = useState<string>("");


  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  const [characterChoices, setCharacterChoices] = useState<ICharacterResponse[]>([]);

  useEffect(() => {
    characterChoiceAPI.getCharacterChoices().then(response => {
        setCharacterChoices(response.data)
        ;
    });
  }, []);

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
    
  const previousCharacter = () => {
      const lastCharacter = characterChoices.length - 1;
      const shouldResetCharacterIndex = currentCharacterIndex === 0;
      const index = shouldResetCharacterIndex ? lastCharacter : currentCharacterIndex - 1;

      setCurrentCharacterIndex(index);
  };

  const nextCharacter = () => {
      const lastCharacter = characterChoices.length - 1;
      const shouldResetCharacterIndex = currentCharacterIndex === lastCharacter;
      const index = shouldResetCharacterIndex ? 0 : currentCharacterIndex + 1;


      setCurrentCharacterIndex(index);
  };

  let characterChoice = "";

  if(characterChoices[currentCharacterIndex] !== undefined){
      characterChoice = characterChoices[currentCharacterIndex]!!.monster_type;
  };

    const saveCharacterChoice = () => {
        if (characterChoices[currentCharacterIndex] !== undefined){
            const chosenCharacter = characterChoices[currentCharacterIndex]
            const playerCharacter: ICurrentUser = {
                ...state.currentUser,
                currenthealth : chosenCharacter.startinghealth,
                currentoffense : chosenCharacter.startingoffense,
                currentdefense : chosenCharacter.startingdefense,
                character_name : chosenCharacter.monster_type,
        }
        
        userAPI.saveUser(playerCharacter);

        dispatch({
            type: SET_CHARACTER,
            userCharacter: playerCharacter
        });

        }
        
    }

    const commitUsername = () => {
      console.log(newUsername);

    };

    const runUsernameCharacterSave = () => {
      saveCharacterChoice();
      commitUsername();
    }

    return (
        <Grid container spacing={3} className="carousel-grid">
            <Grid item xs={12}>
                <h1>Choose Your Character</h1>
            </Grid>
            <div className="character-carousel">
                <div className="left-arrow">
                    <CharacterArrow direction="left" clickFunction={ previousCharacter } glyph="&#9664;" />
                </div>
                <div className={classes.center}>
                   <CharacterSlide url={ characterChoices[currentCharacterIndex] !== undefined ? characterChoices[currentCharacterIndex].image : "" } />
                </div>
                <div className="right-arrow">
                    <CharacterArrow direction="right" clickFunction={ nextCharacter } glyph="&#9654;" />
                </div>
                <img src={bunny} alt="" />
            </div>
            <Grid item xs={12}>
                <h1>{characterChoice}</h1>
            </Grid>
            <div className="register-inputs">
        <input onChange={handleInputChange} type="text" name="user-name" placeholder="Enter Username" />
        <div className="username-confirm">
          {usernameConfirmArea}
        </div>
      <Link to="/home">
          <button disabled={!usernameAvailable} onClick={runUsernameCharacterSave}>CONFIRM</button>
      </Link>
      </div>
        </Grid>
        
    );
}

export default CharacterCarousel;