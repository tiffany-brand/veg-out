import React from 'react';
import './UserData.css';
import bunny from '../../svg/bunny.svg'

interface IUserData {
  level: string;
  character: string;
}

const userData: IUserData = {
  level: "Forager",
  character: bunny
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