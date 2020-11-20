import React, { Component } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Challenges.css';
import challengesAPI from '../../utils/challengesAPI';
import {useStoreContext} from "../../state/GlobalState";
import {LOADING} from "../../state/actions";

export default function Challenges(){



const[state, dispatch] = useStoreContext();

let challengeObj:any = {};
let opponent:any = "";



console.log(state.loading)


 function getChal(){



  if (state.currentUser.challenged === true && state.currentUser.currentChallenge!= undefined) {

    let tempId = state.currentUser.currentChallenge;
    let chalID = tempId.toString();

    challengesAPI.getChallenge(chalID).then(res => {
      challengeObj = res.data;
      console.log(challengeObj);
      return getOpponent();
    }).catch(err => console.log(err));
  }
  else{console.log("else fired" + state.currentUser)}

}

 function getOpponent(){
      if 
      (challengeObj.player_one._id == state.currentUser._id)
      {opponent = challengeObj.player_two.username;
        return displayPage()
      }
      else{
        opponent = challengeObj.player_one.username;
        return displayPage()
        

}

 }





function displayPage(){
      return( <div className="card-container">
          <div className="card-holder">
            <h2>PENDING CHALLENGES</h2>
            <DetailCard>
              <p>
                No pending challenges
              </p>
            </DetailCard>
    
          </div>
          <div className="user-data-holder">
            <UserData />
          </div>
          <div className="card-holder">
            <h2>CURRENT CHALLENGES</h2>
            <DetailCard>
              <p>
                Versus: {opponent}
                Ends: {challengeObj.date_ending}
              </p>
            </DetailCard>
          </div>
        </div>)}

return getChal()
  
};