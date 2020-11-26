import React, { useState, useEffect } from "react";
import './KeithTestGrid.css'

// Gives us a formatted date object
import { DateTime } from 'luxon';

// access to global state for current user data
import { useStoreContext } from '../../state/GlobalState';


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


const PlantLogSearch: React.FC = () => {

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
  };

  // Update DB with current meal
  const logCurrentMeal = () => {

    // **** Update User table ****
    // I need to figure out how to get unique plants added to unique column

    // Build array from meal's veggies
    const mealVeggiesArray = currentMeal.map((item: any) => {
      return item._id;
    })

    // **** Update Meal-Log table
    mealLogAPI.saveMealLog({
      date: date,
      mealVeggies: mealVeggiesArray,
      user: loggingUser._id!
    })

    // Clear the current meal area
    setCurrentMeal([]);
  };

  return (
    <div className="test-div">
      <input onChange={updateSearchArray} value={input} placeholder="Search Plants" />
      {searchArray.length
        ?
        <ul>{searchArray.slice(0, 5).map(function (plant, idx) {
          return <li className="plant-log-item" onClick={() => addPlant(plant)} key={idx}>{plant.plantName} +</li>
        })}</ul>

        :
        <ul>
          {conditionallySort(availablePlants, !!input)
            .reduce<React.ReactElement[]>((acc, curr, idx) => {
              if (acc.length < 5) {
                acc.push(<li className="plant-log-item" onClick={() => addPlant(curr)} key={idx}>{curr.plantName} +</li>)
              }
              return acc;
            }, [])
          }
        </ul>
      }
      <div className="current-meal-area">
        <h5>Current Meal</h5>
        <ul>
          {currentMeal.map(function (plant, index) {
            return <li key={index}>{plant.plantName}</li>
          })}
        </ul>
        <button onClick={logCurrentMeal} className="log-button">+ LOG +</button>
      </div>

    </div>
  )
}
export default PlantLogSearch;
