import React from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Challenges.css';
import challengesAPI from '../../utils/challengesAPI';
import userAPI from '../../utils/userAPI';
import { User } from '@auth0/auth0-react/dist/auth-state';


export default function Challenges() {



  //Thefollowing two IDs will be substituted for global state vars
  const currentUserID = "1";


  let currentObj: any;
  let opponentObj: any;
  let challengeObj: any = {};




     function getUser() {

    userAPI.getUser(currentUserID).then(res => {
      currentObj = res.data;
      console.log(currentObj);
      getChallenge();
    }).catch(err => console.log(err));
  }

   function getChallenge(){

    if (currentObj.challenged === true) {

      let tempId = currentObj.currentChallenge;
      let chalID = tempId.toString();

      challengesAPI.getChallenge(chalID).then(res => {
        challengeObj = res.data;
        console.log(challengeObj);
        getOpponent();
      }).catch(err => console.log(err));

    }

    else {
      console.log("no challenges");
      
      return
    }

  }

   function getOpponent() {

    let searchId=""

    if (challengeObj.playerOne_id == currentObj._id) {
      searchId = challengeObj.playerTwo_id.toString()
    }
    else {
      let tempId = challengeObj.playerOne_id;
      searchId = tempId.toString();
    }
    userAPI.getUser(searchId).then(res => {
      opponentObj = res.data;
      console.log(opponentObj)
    }).catch(err => console.log(err));

  }



  getUser();

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