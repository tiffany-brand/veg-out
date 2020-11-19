import React from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Challenges.css';
import challengesAPI from '../../utils/challengesAPI';
import userAPI from '../../utils/userAPI';
import { User } from '@auth0/auth0-react/dist/auth-state';

export default function Challenges() {

  //Thefollowing two IDs will be substituted for global state vars
const currentUserID= "1";
const opponentUserID= "2";

let pendingChallengesLI: any[] = [] ;
let currentChallengesLI: any[]=[];

let currentObj: User = {};
let opponentObj: User ={};



  function getUser(){
  userAPI.getUser(currentUserID).then(res =>{
    currentObj=res.data[0];
  }).catch(err=> console.log(err));

  if(currentObj.challenged === true){

      challengesAPI.getChallenge(currentObj.currentChallenge).then(res=>{
    currentChallengesLI.push(res);
  }).catch(err=> console.log(err));

  }

  else {console.log("no challenges");
   return}

}

function getOpponent(){

  if (currentChallengesLI.length >= 0){

    userAPI.getUser(opponentUserID).then(res =>{
      opponentObj=res.data[0];
    }).catch(err=> console.log(err));
  

  }
  else{console.log("no challenger");
  return}
}

  
getUser();
getOpponent();

  return (
    <div className="card-container">
      <div className="card-holder">
        <h2>PENDING CHALLENGES</h2>
        <DetailCard>
          <ul>
            {pendingChallengesLI.map(function (challenge, index) {
              return <li key={index}>{challenge}</li>
            })}
          </ul>
        </DetailCard>

      </div>
      <div className="user-data-holder">
        <UserData />
      </div>
      <div className="card-holder">
        <h2>CURRENT CHALLENGES</h2>
        <DetailCard>
          <ul>
            {currentChallengesLI.map(function (challenge, index) {
              return <li key={index}>{challenge}</li>
            })}
          </ul>
        </DetailCard>
      </div>
    </div>
  )

};