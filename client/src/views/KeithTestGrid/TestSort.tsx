import React, { useState, useEffect } from "react";
import './KeithTestGrid.css'

// Importing API and Interface
import veggieAPI from '../../utils/veggiesAPI';
import IVeggies from "../../interfaces/IVeggies";

// Function to create random suggestions
const conditionallySort = <T,>(arr: T[], condition: boolean) => (
  condition ? arr : [...arr].sort(() => .5 - Math.random())
);

const PlantLogSearch: React.FC = () => {

  const [availablePlants, setAvailablePlants] = useState<IVeggies[]>([])
  const [input, setInput] = useState("");
  const [searchArray, setSearchArray] = useState<IVeggies[]>([]);

  useEffect(() => {
    veggieAPI.getVeggies()
      .then((res) => {
        setAvailablePlants(res.data);
      }
      )
  }, []);

  // Function called when search begins
  const updateSearchArray = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value.toLowerCase())

    setSearchArray(availablePlants.filter((el) => (
      el.plantName.toLowerCase().includes(input)
    )))
  }

  return (
    <div className="test-div">
      <input onChange={updateSearchArray} value={input} placeholder="Search Plants" />
      {searchArray.length
        ?
        <ul>{searchArray.slice(0, 5).map(function (plant, idx) {
          return <li key={idx}>{plant.plantName} +</li>
        })}</ul>

        :
        <ul>
          {conditionallySort(availablePlants, !!input)
            .reduce<React.ReactElement[]>((acc, curr, idx) => {
              if (acc.length < 5) {
                acc.push(<li key={idx}>{curr.plantName} +</li>)
              }
              return acc;
            }, [])
          }
        </ul>
      }
      {/* <div>
        <ul id="current-meal-area">
          {currentMeal.map(function (plant, index) {
            return <li key={index}>{plant.plantName}</li>
          })}
        </ul>
        <button onClick={logCurrentMeal} className="log-button">+ LOG +</button>
      </div> */}
    </div>
  )
}
export default PlantLogSearch;
