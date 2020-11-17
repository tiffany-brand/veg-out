import React from 'react';
import './UserData.css';

interface IUserData {
  level: string;
  character: string;
}

const userData: IUserData = {
  level: "Forager",
  character: "./assets/images/vegabunny-400.png"
}

export default function UserData() {

  return (
    <div className="user-details" >
      <h3>• LEVEL •</h3>
      <span className="user-level">{userData.level}</span>
      <img className="userCharacter" src={userData.character} alt=""></img>
    </div>
  );
}