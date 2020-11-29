import React, { useState, useEffect } from "react";
import './PlantLog.css'

// Gives us a formatted date object
import { DateTime } from 'luxon';

// access to global state for current user data
import { useStoreContext } from '../../state/GlobalState';
import { SET_CURRENT_USER } from '../../state/actions';

// Component to return unique plants
import arraySortUniqueVeggies from '../../utils/arraySortingMachine'

// Importing our interfaces
import IVeggies from "../../interfaces/IVeggies";
import IUser from '../../interfaces/IUser';

// Importing APIs
import veggieAPI from '../../utils/veggiesAPI';
import userAPI from '../../utils/userAPI';
import mealLogAPI from '../../utils/mealLogAPI';

// Function to create random suggestions
const conditionallySort = <T,>(arr: T[], condition: boolean) => (
  condition ? arr : [...arr].sort(() => .5 - Math.random())
);

// Creating our current date/time object
const date = DateTime.local().toFormat('yyyyLLdd');


const PlantLog: React.FC = () => {

  // Accessing global state for current user data
  const [state, dispatch] = useStoreContext();

  // Set state for plant search and logging
  const [availablePlants, setAvailablePlants] = useState<IVeggies[]>([])
  const [searchArray, setSearchArray] = useState<IVeggies[]>([]);
  const [input, setInput] = useState("");

  //State for holding current meal
  const [currentMeal, setCurrentMeal] = useState<IVeggies[]>([]);


  // State to hold userAPI data
  const [loggingUser, setLoggingUser] = useState<IUser>({
    email: "",
    auth0ID: "",
    _id: "",
    nickname: "",
    challenged: false,
    currentChallenge: "",
    wins: 0,
    losses: 0,
    ties: 0,
    lifetimeUniqueVeggies: [],
    lifetimeTotalVeggies: 0,
  })


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

  // Function called when search begins
  const updateSearchArray = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value.toLowerCase())

    setSearchArray(availablePlants.filter((el) => (
      el.plantName.toLowerCase().includes(input)
    )))
  }

  // Append added plant to current meal and tally total values
  const addPlant = (plant: IVeggies) => {
    setCurrentMeal([...currentMeal, plant])
  };;

  const removePlant = (plant: IVeggies) => {
    const updatedList = currentMeal.filter(item => item.plantName !== plant.plantName)
    setCurrentMeal(updatedList)
  };

  // Update DB with current meal
  const logCurrentMeal = () => {

    // Build array from meal's veggies
    const mealVeggiesArray = currentMeal.map((item: any) => {
      return item.plantName;
    })

    // Call utility to add unique items
    let newUniqueVeggies
    if (!loggingUser.lifetimeUniqueVeggies) {
      newUniqueVeggies = mealVeggiesArray;
    } else {
      newUniqueVeggies = arraySortUniqueVeggies(mealVeggiesArray, loggingUser.lifetimeUniqueVeggies!)
    }

    console.log(`Logging user = 
    ${JSON.stringify(loggingUser)}`);

    // Update user with total and unique veggies
    userAPI.saveUser({ ...loggingUser, lifetimeUniqueVeggies: newUniqueVeggies })

    // **** Update Meal-Log table
    mealLogAPI.saveMealLog({
      date: date,
      mealVeggies: mealVeggiesArray,
      user: loggingUser._id!
    })

    dispatch({
      type: SET_CURRENT_USER,
      currentUser: {
        ...state.currentUser,
        lifetimeUniqueVeggies: loggingUser.lifetimeUniqueVeggies ? loggingUser.lifetimeUniqueVeggies.concat(newUniqueVeggies) : newUniqueVeggies,
        lifetimeTotalVeggies: loggingUser.lifetimeTotalVeggies + mealVeggiesArray.length,
      }
    })

    // Clear the current meal area
    setCurrentMeal([]);
  };

  return (
    <div className="plant-log-area">
      <input onChange={updateSearchArray} value={input} placeholder="Search Plants" />
      <div className="list-container">
        {searchArray.length
          ?
          <ul className="add-plant">{searchArray.slice(0, 5).map(function (plant, idx) {
            return <li className="plant-log-item" onClick={() => addPlant(plant)} key={idx}>{plant.plantName}</li>
          })}</ul>

          :
          <ul className="add-plant">
            {conditionallySort(availablePlants, !!input)
              .reduce<React.ReactElement[]>((acc, curr, idx) => {
                if (acc.length < 5) {
                  acc.push(<li className="plant-log-item" onClick={() => addPlant(curr)} key={idx}>{curr.plantName}</li>)
                }
                return acc;
              }, [])
            }
          </ul>
        }
      </div>
      <div className="current-meal-area">
        <h3 className="underlined-header">Current Meal</h3>
        <div className="list-container">
          <ul className="remove-plant">
            {currentMeal.map(function (plant, index) {
              return <li className="plant-log-item" onClick={() => removePlant(plant)} key={index}>{plant.plantName}</li>
            })}
          </ul>
        </div>
        <button onClick={logCurrentMeal} className="log-button">+ LOG +</button>
      </div>

    </div>
  )
}
export default PlantLog;
