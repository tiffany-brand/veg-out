import React from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';
import challengesAPI from '../../utils/challengesAPI';
import userAPI from "../../utils/userAPI"

function ChallengeDetail(): JSX.Element {

    //The following objects would be replaced with
    // objects obtained fom table data

    const currentChallenge= "1";


    let p1Obj: any = {};
    let p2Obj: any = {};
    let challengeObj: any ={};
    
    
    
    
      function getChallenge(){

    
          challengesAPI.getChallenge(currentChallenge).then(res=>{
        challengeObj=res.data[0];
        console.log(challengeObj)
      }).catch(err=> console.log(err));
    
      }
    
    function getP1(){
    
      userAPI.getUser(challengeObj.playerOne_id).then(res =>{
        p1Obj=res.data[0];
        console.log(p1Obj)
      }).catch(err=> console.log(err));
    
    }

    function getP2(){
    
      userAPI.getUser(challengeObj.playerTwo_id).then(res =>{
        p2Obj=res.data[0];
        console.log(p2Obj)
      }).catch(err=> console.log(err));
    
    }
    
    
      
    getChallenge();
    getP1();
    getP2();
    

    return (
      <div>

    <div className="card-container">
      <div className="card-holder">
        <h2>{p1Obj.username}</h2>
        <DetailCard>
          <ul>
            <li>HP: {challengeObj.player_one_health}</li>
            <li>OFFENSE: {challengeObj.player_one_offense}</li>
            <li>DEFENSE: {challengeObj.player_one_defense}</li>
            <li>VEGGIES LOGGED: {challengeObj.player_one_plantTotal}</li>
          </ul>
          <img src={p1Obj.character_image} alt="character image" />
        </DetailCard>
        </div>

      <div className="card-holder">
        <h2>{p2Obj.username}</h2>
        <DetailCard>
          <ul>
            <li>HP: {challengeObj.player_two_health}</li>
            <li>OFFENSE: {challengeObj.player_two_offense}</li>
            <li>DEFENSE: {challengeObj.player_two_defense}</li>
            <li>VEGGIES LOGGED: {challengeObj.player_two_plantTotal}</li>
          </ul>
          <img src={p2Obj.character_image} alt="character image" />

        </DetailCard>
        </div>
        </div>

        <Link to="/"><button>Home</button></Link>

        </div>
  )

};
export default ChallengeDetail;