import React from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import { Link } from 'react-router-dom';
import './Community.css';

//****** REMEMBER TO DELETE *******
// Sample data for build/test
import { communityList, suggestedOpponents } from "../../utils/testUserArray"

export default function Community() {

  return (
    <div className="community-container">
      <h1>COMMUNITY</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>YOUR GARDEN</h2>
          <DetailCard>
            <ul>
              {communityList.map(function (member, index) {
                return <li key={index}><img className="member-character" src={member.character} alt=""></img> {member.name}: <Link to={member.infoPage}>i</Link> <Link to={member.challengeLink}>+</Link> </li>
              })}
            </ul>
          </DetailCard>
        </div>
        <div className="card-holder">
          <h2>FIND NEW CHALLENGERS</h2>
          <DetailCard>
            <h3>- Suggested Opponents -</h3>
            <ul>
              {suggestedOpponents.slice(0, 3).map(function (member, index) {
                return <li key={index}>{member.name}: <Link to={member.infoPage}>i</Link> <Link to={member.challengeLink}>+</Link> </li>
              })}
            </ul>
            <h3>- Search Username -</h3>
            <input type="text" name="user-name" placeholder="Enter Username" />
            <div className="search-results" id="search-results">Search Results Here</div>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};