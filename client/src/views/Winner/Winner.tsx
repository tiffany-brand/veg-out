import React from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import Gameplay from "../../components/Gameplay/gameplay";
import {useStoreContext} from '../../state/GlobalState';


function Winner(): JSX.Element {

const [state, dispatch] = useStoreContext();

const win = Gameplay(state.challenges);

  return (
    <div>
  
      <div className="card-container">
        <div className="card-holder">
          <h2>{state.challenges.player_one.username}</h2>
          <DetailCard>
            <ul>
              <li>HP: {state.challenges.player_one_health}</li>
              <li>OFFENSE: {state.challenges.player_one_offense}</li>
              <li>DEFENSE: {state.challenges.player_one_defense}</li>
              <li>VEGGIES LOGGED: {state.challenges.player_one_plantTotal}</li>
            </ul>
            <img src={state.challenges.player_one.character_image} alt="character image" />
          </DetailCard>
        </div>
  
  
        <div className="card-holder">
            <h2>AND THE WINNER IS...</h2>
            <DetailCard>
              <h1>{win}</h1>
              <img src="/" alt="Image Of Trophy" />
            </DetailCard>
          </div>
  
  
        <div className="card-holder">
          <h2>{state.challenges.player_two.username}</h2>
          <DetailCard>
            <ul>
              <li>HP: {state.challenges.player_two_health}</li>
              <li>OFFENSE: {state.challenges.player_two_offense}</li>
              <li>DEFENSE: {state.challenges.player_two_defense}</li>
              <li>VEGGIES LOGGED: {state.challenges.player_two_plantTotal}</li>
            </ul>
            <img src={state.challenges.player_two.character_image} alt="character image" />
  
          </DetailCard>
        </div>
      </div>
  
      <Link to="/"><button>Home</button></Link>
  
    </div>)


};
export default Winner;


