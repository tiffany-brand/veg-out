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

  // State for log display
  const [loggedMealStats, setLoggedMealStats] = useState<number>(0)

  //State for holding current meal
  const [currentMeal, setCurrentMeal] = useState<IVeggies[]>([]);

  // Call the APIs for veggies and user data
  useEffect(() => {
    Promise.all([userAPI.getUser(state.currentUser._id), veggieAPI.getVeggies()])
      .then(([userRes, veggieRes]) => {
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

  // Append added plant to current meal list
  const addPlant = (plant: IVeggies) => {
    setCurrentMeal([...currentMeal, plant])
    setInput("")
    setLoggedMealStats(0)
  };;

  // Remove plant from current meal list
  const removePlant = (plant: IVeggies) => {
    const updatedList = currentMeal.filter(item => item.plantName !== plant.plantName)
    setCurrentMeal(updatedList)
  };

  // Meal Label/menu assets
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [menuLabel, setMenuLabel] = useState<string>("Meal Label ⇩")

  const menuEvent = (event: React.MouseEvent<HTMLInputElement>) => {
    setMenuActive(!menuActive);
    setMenuLabel(event.currentTarget.dataset.menu_item!)
  };

  // Update DB with current meal
  const logCurrentMeal = () => {

    // Build array from meal's veggies
    const mealVeggiesArray = currentMeal.map((item: any) => {
      return item.plantName;
    })

    // Call utility to add unique items
    let newUniqueVeggies
    if (!state.currentUser.lifetimeUniqueVeggies) {
      newUniqueVeggies = mealVeggiesArray;
    } else {
      newUniqueVeggies = arraySortUniqueVeggies(mealVeggiesArray, state.currentUser.lifetimeUniqueVeggies!)
    }

    // Update user with total and unique veggies
    userAPI.saveUser({ ...state.currentUser, lifetimeUniqueVeggies: newUniqueVeggies, lifetimeTotalVeggies: (mealVeggiesArray.length + state.currentUser.lifetimeTotalVeggies) })
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: res.data
        })
      })
    // **** Update Meal-Log table
    mealLogAPI.saveMealLog({
      date: date,
      mealVeggies: mealVeggiesArray,
      user: state.currentUser._id,
      mealLabel: menuLabel
    })

    // Clear the current meal area
    setCurrentMeal([]);
    setLoggedMealStats(mealVeggiesArray.length);
  };

  return (
    <div className="plant-log-area">

      <input className="plant-log-input" onChange={updateSearchArray} value={input} placeholder="Search Plants" />

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
          {loggedMealStats > 0
            ?
            <div className="logged-meal-stats">
              {`Added ${loggedMealStats} plants!`}
            </div>
            :
            <ul className="remove-plant">
              {currentMeal.map(function (plant, index) {
                return <li className="plant-log-item" onClick={() => removePlant(plant)} key={index}>{plant.plantName}</li>
              })}
            </ul>
          }
        </div>

        <div className="dropdown">

          <div className="dropbtn" onClick={menuEvent} data-menu_item="Meal Label ⇩">{menuLabel}</div>

          <div className={`dropdown-content ${menuActive ? "display-meal-menu" : null}`}>
            <p onClick={menuEvent} data-menu_item="Breakfast">Breakfast</p>
            <p onClick={menuEvent} data-menu_item="Lunch">Lunch</p>
            <p onClick={menuEvent} data-menu_item="Dinner">Dinner</p>
            <p onClick={menuEvent} data-menu_item="Snack">Snack</p>
          </div>
        </div>
      </div>
      <button onClick={logCurrentMeal} className={`log-button ${(currentMeal.length === 0 || menuLabel === "Meal Label ⇩") ? "disabled" : null}`}>+ LOG +</button>

    </div>
  )
}
export default PlantLog;
