import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import { Link } from 'react-router-dom';
import UserData from '../../components/UserData/UserData';
import './Community.css';

const communityList = [
  {
    name: "Marcus",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Paula",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Gwendoline",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Jerome",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  }
]

const suggestedOpponents = [
  {
    name: "Bruce",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Marylyn",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Donna",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  },
  {
    name: "Roger",
    character: "./assets/images/vegabunny-50.png",
    infoPage: "https://www.espncricinfo.com/india/content/player/625383.html",
    challengeLink: "https://www.espncricinfo.com/india/content/player/625383.html"
  }
]

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