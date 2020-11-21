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
  const [loggingUser, setLoggingUser] = useState<ICurrentUser>({})

  useEffect(() => {
    Promise.all([userAPI.getUser(state.currentUser._id), veggieAPI.getVeggies()])
      .then(([userRes, veggieRes]) => {
        setLoggingUser(userRes.data);
        setAvailablePlants(veggieRes.data);
      }
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentMeal, setCurrentMeal] = useState<IVeggies[]>([]);
  const [searchArray, setSearchArray] = useState<IVeggies[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  //Create state to hold tallied plant power prior to adding to current user
  const [mealStats, setMealStats] = useState({
    mealHealth: 0,
    mealDefense: 0,
    mealOffense: 0
  })

  // Get the plants API and set them to state
  const [availablePlants, setAvailablePlants] = useState<IVeggies[]>([])

  //As user types populate search results
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeSearch = event.target.value.toLowerCase()
    const currentSearch = availablePlants.filter((el) => (
      el.plantName.toLowerCase().includes(activeSearch)
    ))
    setSearchArray(currentSearch)
    setSearchTerm(activeSearch);
  };

  // Append added plant to current meal and tally total values
  const addPlant = (plant: IVeggies) => {
    setCurrentMeal([...currentMeal, plant])
    const newHealth = mealStats.mealHealth + plant.total_HP;
    const newDefense = mealStats.mealDefense + plant.defense;
    const newOffense = mealStats.mealOffense + plant.offense;
    setMealStats({ mealHealth: newHealth, mealDefense: newDefense, mealOffense: newOffense })

  };

  // Update DB with current meal with current meal.
  const logCurrentMeal = () => {
    console.log(loggingUser);

    const { currenthealth, currentoffense, currentdefense } = loggingUser;
    const { mealHealth, mealDefense, mealOffense } = mealStats;
    const updatedStats = {
      health: (currenthealth || 0) + mealHealth,
      defense: (currentdefense || 0) + mealDefense,
      offense: (currentoffense || 0) + mealOffense
    }

    userAPI.saveUser({ ...loggingUser, currenthealth: updatedStats.health, currentdefense: updatedStats.defense, currentoffense: updatedStats.offense })
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