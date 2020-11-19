import React, { useEffect, useState } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import ICurrentUser from '../../interfaces/ICurrentUser'
import userAPI from '../../utils/userAPI'
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
              return <p key={index}>{user.username} +</p>
            })}</div>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};