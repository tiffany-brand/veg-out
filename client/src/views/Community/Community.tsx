import React, { useEffect, useState } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import ICurrentUser from '../../interfaces/ICurrentUser';
import IChallenges from '../../interfaces/IChallenges';
import userAPI from '../../utils/userAPI';
import challengesAPI from '../../utils/challengesAPI';
import {useStoreContext} from '../../state/GlobalState';
import {DateTime} from 'luxon';
import {SET_CURRENT_USER} from '../../state/actions';
import { Link } from 'react-router-dom';
import './Community.css';

const d = DateTime.local()

const date = DateTime.local().toFormat('yyyyLLdd');
const week =  DateTime.local().plus({days: 5}).toISODate();




export default function Community() {

  const [searchArray, setSearchArray] = useState<ICurrentUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allUsers, setAllUsers] = useState<ICurrentUser[]>([])

  //As user types populate search results
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeSearch = event.target.value.toLowerCase()
    const currentSearch = allUsers.filter((el) => (
      el.username?.toLowerCase().includes(activeSearch)
    ))
    setSearchArray(currentSearch)
    setSearchTerm(activeSearch);
  };

  const [state, dispatch] = useStoreContext();

  function startChal(opp:any){

  if (state.currentUser.challenged===false){
    const opponent = opp;
    const ID = Math.floor(Math.random()* 10000)
    const challenge={
      _id: ID.toString(),
      date_started: date,
      date_ending:week,
      player_one: state.currentUser._id,
      player_two: opponent._id,
      player_one_health:100,
      player_one_defense:100,
      player_one_offense:100,
      player_one_plantTotal:0,
      player_two_health:100,
      player_two_defense:100,
      player_two_offense:100,
      player_two_plantTotal:0
      
    };


    challengesAPI.saveChallenge(challenge)
    .then(res=> {
      alert("New Challenge Has Begun!");
      console.log(res);
    }).catch(err=> console.log(err));
      
    userAPI.saveUser({ ...state.currentUser, challenged:true, currentChallenge:ID });

    dispatch({
        type: SET_CURRENT_USER,
        currentUser: {
          ...state.currentUser,
          challenged: true,
          currentChallenge: ID
        }
      });
    


  }
else {
  alert("Please complete your current challenge before starting a new one!")
  }

}


  useEffect(() => {
    userAPI.getUsers()
      .then(res => {
        setAllUsers(res.data);

      })
  }, [])

  return (
    <div className="community-container">
      <h1>COMMUNITY</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>Recent Opponents</h2>
          <DetailCard>
            <ul>
              {allUsers.slice(0, 5).map(function (member, index) {
                return <li key={index}> {member.username}</li>
              })}
            </ul>
          </DetailCard>
        </div>
        <div className="card-holder">
          <h2>FIND NEW CHALLENGERS</h2>
          <DetailCard>
            <h3>- Search Opponents -</h3>
            <input onChange={handleInputChange} type="text" name="user-name" placeholder="Enter Username" value={searchTerm} />
            <div className="search-results" id="search-results">{searchArray.slice(0, 3).map(function (user, index) {
              return <p key={index}>{user.username}  <button onClick={()=>startChal(user)}>+</button> </p>
            })}</div>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};