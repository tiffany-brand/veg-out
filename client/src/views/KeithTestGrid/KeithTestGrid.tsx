import React, { useState, useEffect } from "react";
import './KeithTestGrid.css'


import IVeggies from "../../interfaces/IVeggies";

// Importing APIs
import veggieAPI from '../../utils/veggiesAPI';

const conditionallySort = <T,>(arr: T[], condition: boolean) => (
  condition ? arr : [...arr].sort(() => .5 - Math.random())
);

const SortedList: React.FC = () => {

  const [availablePlants, setAvailablePlants] = useState<IVeggies[]>([])

  const [sourceArray, setSourceArray] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    veggieAPI.getVeggies()
      .then((res) => {
        setAvailablePlants(res.data);
        console.log(res.data);

      }
      )
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSourceArray(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]);
  //   }, 350);
  // }, []);

  return (
    <div className="test-div">
      <input onChange={(e) => setInput(e.currentTarget.value)} value={input} placeholder="search" />
      {availablePlants.length
        ? <ul>
          {conditionallySort(availablePlants, !!input)
            .reduce<React.ReactElement[]>((acc, curr, idx) => {
              if (curr.plantName.includes(input) && acc.length < 5) {
                acc.push(<li key={idx}>{curr.plantName}</li>)
              }
              return acc;
            }, [])
          }
        </ul>
        : <div>Loading...</div>
      }
    </div>
  )
}
export default SortedList;