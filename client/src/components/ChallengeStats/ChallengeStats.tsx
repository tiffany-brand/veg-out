import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../DetailCard/DetailCard';


import Grid from '@material-ui/core/Grid';
import mealLogAPI from '../../utils/mealLogAPI';
import userAPI from '../../utils/userAPI'
import IMealLog from '../../interfaces/IMealLog';
import challengeUtils from '../../utils/gameplayUtils/gamplayUtils';
import gamplayUtils from '../../utils/gameplayUtils/gamplayUtils';

function ChallengeStats(props: {userID:string, startDate: string, endDate: string}) {
  const { userID, startDate, endDate } = props;

  const [currentChallengeMealLog, setCurrentChallengeMealLog] = useState<IMealLog[]>([]);
  const [challengeMeals, setchallengeMeals] = useState<[][]>([]);
  const [totalVeggieArray, setTotalVeggieArray] = useState<string[]>([])
  const [uniqueVeggieArray, setuniqueVeggieArray] = useState<string[]>([]);
  const [currentBonusMultiplier, setCurrentBonusMultiplier] = useState<number>(1);
  // initial loading brings up the challenge specific mealLog.

  useEffect(() => {
    mealLogAPI.getChallengeMeallog(userID, startDate, endDate).then((data) => {
      setCurrentChallengeMealLog(data.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  // After meallog loads, this will reduce to just the array of meals.
  useEffect(() => {
    setchallengeMeals(challengeUtils.returnsChallengeMeals(currentChallengeMealLog));
  }, [currentChallengeMealLog])

  // This gives us all of the veggies every eaten!  yum.
  useEffect(() => {
    setTotalVeggieArray(challengeUtils.totalVeggieArrayConstructor(challengeMeals));
    setCurrentBonusMultiplier(challengeUtils.calculateMultiplierBonus(challengeMeals));
  }, [challengeMeals])

  // This reduces the total veggies into unique veggies
  useEffect(() => {
    setuniqueVeggieArray(challengeUtils.uniqueVeggieArrayConstructor(totalVeggieArray));
  }, [totalVeggieArray])




  return (
    <div className="challenge-stats">
      <ul>
        <li>
          Multiplier:{currentBonusMultiplier}
        </li>
        <li>
          Veggies:{totalVeggieArray.length}
        </li>
        <li>
          Unique Veggies:{uniqueVeggieArray.length}
        </li>
        <li>
          Score:{gamplayUtils.scoreCalculator(uniqueVeggieArray, totalVeggieArray, currentBonusMultiplier)}
        </li>
      </ul>


    </div>
  )

};

export default ChallengeStats;