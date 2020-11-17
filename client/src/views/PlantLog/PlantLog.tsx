import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import { Link } from 'react-router-dom';
import UserDetails from '../../components/UserData/UserData'
import UserData from '../../components/UserData/UserData';
import './PlantLog.css';

interface IPlant {
  name: string;
}

const recentPlants: IPlant[] = [
  { name: "Kale" }, { name: "Broccoli" }, { name: "Blueberries" }, { name: "Mushrooms" }
]

export default function PlantLog() {

  const [currentMeal, setCurrentMeal] = useState<IPlant[]>([]);
  const [searchArray, setSearchArray] = useState<IPlant[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeSearch = event.target.value.toLowerCase()
    const currentSearch = recentPlants.filter((el) => (
      el.name.toLowerCase().includes(activeSearch)
    ))
    setSearchArray(currentSearch)
    setSearchTerm(activeSearch);
  };

  const addPlant = (plant: IPlant) => {
    setCurrentMeal([...currentMeal, plant])
  };

  const logCurrentMeal = () => {
    console.log(currentMeal);

  };

  return (
    <div className="plant-log-container">
      <h1>PLANT LOG</h1>
      <div className="card-container">
        <div className="card-holder">
          <h2>ADD PLANTS</h2>
          <DetailCard>
            <h3>- Recently Added -</h3>
            <ul>
              {recentPlants.slice(0, 3).map(function (plant, index) {
                return <li onClick={() => addPlant(plant)} key={index}>{plant.name} +</li>
              })}
            </ul>
            <h3>- Search Plants -</h3>
            <input onChange={handleInputChange} type="text" name="user-name" placeholder="Enter Plant Name" value={searchTerm} />
            <div className="search-results" id="search-results">{searchArray?.slice(0, 1).map(function (plant, index) {
              return <p onClick={() => addPlant(plant)} key={index}>{plant.name} +</p>
            })}</div>
          </DetailCard>
        </div>
        <div className="card-holder">
          <h2>CURRENT MEAL</h2>
          <DetailCard>
            <ul>
              {currentMeal?.map(function (plant, index) {
                return <li key={index}>{plant.name}</li>
              })}
            </ul>
            <button onClick={logCurrentMeal} className="log-button">+ LOG +</button>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};