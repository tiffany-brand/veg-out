import React, { Component } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import UserData from '../../components/UserData/UserData';
import './Challenges.css';
import challengesAPI from '../../utils/challengesAPI';
import userAPI from '../../utils/userAPI';
import GlobalState from "../../state/GlobalState"


class Challenges extends Component{

  state={
    isLoading: true,
    opponent: ""

  }



  //Thefollowing two IDs will be substituted for global state vars
  const currentUserID = React.useContext(GlobalState.id)







getUser() {

    userAPI.getUser(currentUserID).then(res => {
      currentObj = res.data;
      console.log(currentObj);
      this.getChallenge();
    }).catch(err => console.log(err));
  }

getChallenge=()=>{

    if (this.state.currentObj.challenged === true) {

      let tempId = currentObj.currentChallenge;
      let chalID = tempId.toString();

      challengesAPI.getChallenge(chalID).then(res => {
        challengeObj = res.data;
        console.log(challengeObj);
        determineOpponent();
      }).catch(err => console.log(err));

    }

    else {
      console.log("no challenges");
      
      return
    }

  }

  function determineOpponent(){

    if (challengeObj.player_one._id == currentObj._id)
    {opponent = challengeObj.player_two.username}
    else{
      opponent = challengeObj.player_one.username
    };

    console.log(opponent);

    



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
            Versus: {opponent}
            Ends: {challengeObj.date_ending}
          </p>
        </DetailCard>
      </div>
    </div>
  )

};