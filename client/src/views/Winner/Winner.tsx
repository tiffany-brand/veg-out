import React from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import gameplay from "../../components/Gameplay/gameplay";
import challengesAPI from "../../utils/challengesAPI";


function Winner(): JSX.Element {

  //The following objects would be replaced with
  // objects obtained fom table data

  const challengeID="1";


  const player1 = {
    currentattack: 20,
    currentdefense: 30,
    currenthealth: 100,
    character_name: "p1 name",
    veggiesEaten: 30,
    characterIMG: "/"
  };

  const player2 = {

    currentattack: 30,
    currentdefense: 20,
    currenthealth: 100,
    character_name: "p2 name",
    veggiesEaten: 30,
    characterIMG: "/"

  };

  let currentChallenge: any = {};

  challengesAPI.getChallenge(challengeID).then(res=>{
    currentChallenge=res.data[0];
  }).catch(err=> console.log(err));



  const win = gameplay(player1, player2);

  return (


    <div className="card-container">
      <div className="card-holder">
        <h2>{player1.character_name}</h2>
        <DetailCard>
          <ul>
            <li>HP: {player1.currenthealth}</li>
            <li>OFFENSE: {player1.currentattack}</li>
            <li>DEFENSE: {player1.currentdefense}</li>
            <li>VEGGIES LOGGED: {player1.veggiesEaten}</li>
          </ul>
          <img src={player1.characterIMG} alt="character image" />
        </DetailCard>
      </div>



      <div className="card-holder">
        <h2>And the winner is...</h2>
        <DetailCard>
          <h2>
            {win} !
          </h2>
          <img src="/" alt="image of trophy" />
        </DetailCard>
      </div>



      <div className="card-holder">
        <h2>{player1.character_name}</h2>
        <DetailCard>
          <ul>
            <li>HP: {player2.currenthealth}</li>
            <li>OFFENSE: {player2.currentattack}</li>
            <li>DEFENSE: {player2.currentdefense}</li>
            <li>VEGGIES LOGGED: {player2.veggiesEaten}</li>
          </ul>
          <img src={player2.characterIMG} alt="character image" />

        </DetailCard>
      </div>


      <Link to="/"><button>Home</button></Link>
    </div>

  )

};
export default Winner;