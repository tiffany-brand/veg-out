import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import { useStoreContext } from '../../state/GlobalState';
import { DateTime } from 'luxon';
import './PlantLog.css';

// Importing our interfaces
import IVeggies from "../../interfaces/IVeggies";
import ICurrentUser from '../../interfaces/ICurrentUser';
import IMealLog from '../../interfaces/IMealLog'

// Importing APIs
import veggieAPI from '../../utils/veggiesAPI';
import userAPI from '../../utils/userAPI';
import mealAPI from '../../utils/mealLogAPI';
import mealLogAPI from '../../utils/mealLogAPI';

const date = DateTime.local().toFormat('yyyyLLdd');

// Begin functional component.
export default function PlantLog() {
  // Bring in Global Sate to identify logged in user.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useStoreContext();

  // Set state for currently logging user
  const [loggingUser, setLoggingUser] = useState<ICurrentUser>({})

  // Call the APIs for veggies and user data
  useEffect(() => {
    Promise.all([userAPI.getUser(state.currentUser._id), veggieAPI.getVeggies()])
      .then(([userRes, veggieRes]) => {
        setLoggingUser(userRes.data);
        setAvailablePlants(veggieRes.data);
      }
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Put veggie API into state
  const [availablePlants, setAvailablePlants] = useState<IVeggies[]>([])

  // Set state for veggie search
  const [currentMeal, setCurrentMeal] = useState<IVeggies[]>([]);
  const [searchArray, setSearchArray] = useState<IVeggies[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  //Create state to hold tallied plant power prior to adding to current user
  const [mealStats, setMealStats] = useState({
    mealHealth: 0,
    mealDefense: 0,
    mealOffense: 0
  })

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

  // Update DB with current meal
  const logCurrentMeal = () => {

    // Get the needed data from current meal and existing user totals
    const { currenthealth, currentoffense, currentdefense } = loggingUser;
    const { mealHealth, mealDefense, mealOffense } = mealStats;
    const updatedStats = {
      health: (currenthealth || 0) + mealHealth,
      defense: (currentdefense || 0) + mealDefense,
      offense: (currentoffense || 0) + mealOffense
    }

    // **** Update User table ****
    userAPI.saveUser({ ...loggingUser, currenthealth: updatedStats.health, currentdefense: updatedStats.defense, currentoffense: updatedStats.offense })

    // Build array from meal's veggies
    const mealVeggiesArray = currentMeal.map((item: any) => {
      return item._id;
    })

    // **** Update Meal-Log table
    mealLogAPI.saveMealLog({
      date: date,
      mealVeggies: mealVeggiesArray,
      userID: loggingUser._id!
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