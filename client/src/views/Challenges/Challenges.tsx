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


let currentObj: any = {};
let opponentObj: any = {};
let challengeObj: any ={};




  function getUser(){

  userAPI.getUser(currentUserID).then(res =>{
    currentObj=res.data[0];
    console.log(currentObj)
  }).catch(err=> console.log(err));

  if(currentObj.challenged === true){

      challengesAPI.getChallenge(currentObj.currentChallenge).then(res=>{
    challengeObj=res.data[0];
    console.log(challengeObj)
  }).catch(err=> console.log(err));

  }

  else {console.log("no challenges");
   return}

}

function getOpponent(){

  let searchId:string=""

  if (challengeObj.playerOne_id === currentObj._id){
    searchId=challengeObj.playerTwo_id
  }
  else
  {
    searchId=challengeObj.playerOne_id;
  }
  userAPI.getUser(searchId).then(res =>{
    opponentObj=res.data[0];
    console.log(opponentObj)
  }).catch(err=> console.log(err));

}


  
getUser();
getOpponent();

  return (
    <div className="card-container">
      <div className="card-holder">
        <h2>PENDING CHALLENGES</h2>
        <DetailCard>
          <p>
            No challenges pending
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
            Versus: {opponentObj.username}
            Ends: {challengeObj.date_ending}
          </p>
        </DetailCard>
      </div>
    </div>
  )

};