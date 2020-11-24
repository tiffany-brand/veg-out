import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import { useStoreContext } from '../../state/GlobalState';
import { DateTime } from 'luxon';
import './PlantLog.css';

// Importing our interfaces
import IVeggies from "../../interfaces/IVeggies";
import ICurrentUser from '../../interfaces/ICurrentUser';

// Importing APIs
import veggieAPI from '../../utils/veggiesAPI';
import userAPI from '../../utils/userAPI';
import mealLogAPI from '../../utils/mealLogAPI';

import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    flexGrow: 1,
  },
}),
);

const date = DateTime.local().toFormat('yyyyLLdd');

// Begin functional component.
export default function PlantLog() {

  const classes = useStyles();

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
        setSearchArray(availablePlants);
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

    // Clear the current meal area
    setCurrentMeal([]);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>PLANT LOG</h1>
        </Grid>
          <Grid item xs={6} className="card-holder">
            <h2>ADD PLANTS</h2>
            <DetailCard>
              <h3>- Search Plants -</h3>
              <input className="log-input" onChange={handleInputChange} type="text" name="user-name" placeholder="Enter Plant Name" value={searchTerm} />
              <div className="search-results" id="search-results">{searchArray.slice(0, 4).map(function (plant, index) {
                return <p className="search-suggest" onClick={() => addPlant(plant)} key={index}>{plant.plantName} +</p>
              })}</div>
            </DetailCard>
          </Grid>
          <Grid item xs={6} className="card-holder">
            <h2>CURRENT MEAL</h2>
            <DetailCard>
              <ul id="current-meal-area">
                {currentMeal.map(function (plant, index) {
                  return <li key={index}>{plant.plantName}</li>
                })}
              </ul>
            </DetailCard>
          </Grid>
          <Grid className="center-button" item xs={6}>
              <button onClick={logCurrentMeal} className="log-button">+ LOG +</button>
          </Grid>
      </Grid>
    </div>
  )

};