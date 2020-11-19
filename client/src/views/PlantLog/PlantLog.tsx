import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import { useStoreContext } from '../../state/GlobalState';
import './PlantLog.css';

import IVeggies from "../../interfaces/IVeggies";
import veggieAPI from '../../utils/veggiesAPI';

import ICurrentUser from '../../interfaces/ICurrentUser'
import userAPI from '../../utils/userAPI'

export default function PlantLog() {
  const [state, dispatch] = useStoreContext();

  const [availablePlants, setAvailablePlants] = useState<IVeggies[]>([])
  const [currentMeal, setCurrentMeal] = useState<IVeggies[]>([]);
  const [searchArray, setSearchArray] = useState<IVeggies[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {

    veggieAPI.getVeggies()
      .then(res => {
        setAvailablePlants(res.data)
      })

  }, []);

  const [userForNow, setUserForNow] = useState<ICurrentUser>({})

  useEffect(() => {
    userAPI.getUser("538a717e-6629-4c9a-8a1d-a5145e9ba555")
      .then(res => {
        setUserForNow(res.data);
        setMealStats({ currenthealth: res.data.currenthealth, currentoffense: res.data.currentoffense, currentdefense: res.data.currentdefense })
      })
  }, [])


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeSearch = event.target.value.toLowerCase()
    const currentSearch = availablePlants.filter((el) => (
      el.plantName.toLowerCase().includes(activeSearch)
    ))
    setSearchArray(currentSearch)
    setSearchTerm(activeSearch);
  };


  const [mealStats, setMealStats] = useState({
    currenthealth: userForNow.currenthealth || 0,
    currentdefense: userForNow.currentdefense || 0,
    currentoffense: userForNow.currentoffense || 0
  })

  const addPlant = (plant: IVeggies) => {
    setCurrentMeal([...currentMeal, plant])
    const newHealth = mealStats.currenthealth + plant.total_HP;
    const newDefense = mealStats.currentdefense + plant.defense;
    const newOffense = mealStats.currentoffense + plant.offense;

    setMealStats({ ...mealStats, currenthealth: newHealth, currentdefense: newDefense, currentoffense: newOffense })
  };

  console.log(mealStats);


  const logCurrentMeal = () => {

    userAPI.saveUser({ ...userForNow, currenthealth: mealStats.currenthealth, currentdefense: mealStats.currentdefense, currentoffense: mealStats.currentoffense })
      .then(res => {
        console.log(res.data);

      })

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
              {availablePlants.slice(0, 3).map(function (plant, index) {
                return <li onClick={() => addPlant(plant)} key={index}>{plant.plantName} +</li>
              })}
            </ul>
            <h3>- Search Plants -</h3>
            <input onChange={handleInputChange} type="text" name="user-name" placeholder="Enter Plant Name" value={searchTerm} />
            <div className="search-results" id="search-results">{searchArray.slice(0, 3).map(function (plant, index) {
              return <p onClick={() => addPlant(plant)} key={index}>{plant.plantName} +</p>
            })}</div>
          </DetailCard>
        </div>
        <div className="card-holder">
          <h2>CURRENT MEAL</h2>
          <DetailCard>
            <ul>
              {currentMeal.map(function (plant, index) {
                return <li key={index}>{plant.plantName}</li>
              })}
            </ul>
            <button onClick={logCurrentMeal} className="log-button">+ LOG +</button>
          </DetailCard>
        </div>
      </div>
    </div>
  )

};