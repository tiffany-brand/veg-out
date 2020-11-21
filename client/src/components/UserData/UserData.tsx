import React from 'react';
import './UserData.css';
import bunny from '../../svg/bunny.svg'

interface IProps {
  level: number | undefined;
  character_image: string | undefined;
}

export default function UserData(props: IProps) {

  return (
    <div className="user-details" >
      <h3>• LEVEL •</h3>
      <span className="user-level">{props.level}</span>
      <img className="userCharacter" src={props.character_image} alt=""></img>
    </div>
  );
}