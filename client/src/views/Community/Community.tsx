import React, { useEffect, useState } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import ICurrentUser from '../../interfaces/ICurrentUser';
import IChallenges from '../../interfaces/IChallenges';
import userAPI from '../../utils/userAPI';
import challengesAPI from '../../utils/challengesAPI';
import {useStoreContext} from '../../state/GlobalState';

import { Link } from 'react-router-dom';
import './Community.css';

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

  const [state] = useStoreContext();

  function startChal(opp:ICurrentUser){

    const opponent = opp;
    const today= Date.now();
    const endDate= new Date(today+7)
    const challenge:IChallenges={
      date_started: today.toString(),
      date_ending: endDate.toString(),
      player_one: state.currentUser,
      player_two: opponent,
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