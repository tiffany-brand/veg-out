import React from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Challenges.css';
import challengesAPI from '../../utils/challengesAPI';
import { useStoreContext } from "../../state/GlobalState";
import { SET_CHALLENGES } from "../../state/actions";
import { Link } from 'react-router-dom';


export default function Challenges() {



  const [state, dispatch] = useStoreContext();


  let opponent: string = "";

  console.log(state.challenges)


  function getChal() {
if(state.currentUser.currentChallenge!==undefined){

      let tempId = state.currentUser.currentChallenge;
      let chalID = tempId.toString();

      challengesAPI.getChallenge(chalID).then(res => {

        dispatch({
          type: SET_CHALLENGES,
          challenges: {
            ...state.challenges,
            ...res.data
          }
        });
        console.log(state.challenges)
      }).catch(err => console.log(err));
    }
    else{console.log("current challenge undefined")}
    
  }

  function getOpponent() {
    if
      (state.challenges.player_one._id == state.currentUser._id) {
      opponent = state.challenges.player_two.username;
    }
    else {
      opponent = state.challenges.player_one.username;

    }

  }
  if (state.currentUser.challenged === false) {
    return (<div className="card-container">
      <div className="card-holder">
        <h2>PENDING CHALLENGES</h2>
        <DetailCard>
          <p>
            No pending challenges
    </p>
        </DetailCard>

      </div>
      <div className="user-data-holder">
      <UserData level={state.currentUser.level} character_name={state.currentUser.character_name} 
       />
      </div>
      <div className="card-holder">
        <h2>CURRENT CHALLENGES</h2>
        <DetailCard>
          <p>
            No current challenges
      
          </p>
        </DetailCard>
      </div>
    </div>)
  }

  else{

    if(!state.challenges.player_two){
    getChal();}
    
  getOpponent();

  return (<div className="card-container">
    <div className="card-holder">
      <h2>PENDING CHALLENGES</h2>
      <DetailCard>
        <p>
          No pending challenges
              </p>
      </DetailCard>

    </div>
    <div className="user-data-holder">
    <UserData level={state.currentUser.level} character_name={state.currentUser.character_name} />
    </div>
    <div className="card-holder">
      <h2>CURRENT CHALLENGES</h2>
      <DetailCard>
        <p>
          Versus: {opponent}
          <br />
          
                Ends: {state.challenges.date_ending}
        </p>
      </DetailCard>
    </div>
  </div>)
  }

};