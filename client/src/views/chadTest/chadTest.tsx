import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DetailCard from '../../components/DetailCard/DetailCard';


import Grid from '@material-ui/core/Grid';
import mealLogAPI from '../../utils/mealLogAPI';
import userAPI from '../../utils/userAPI'
import IMealLog from '../../interfaces/IMealLog';
import challengeUtils from '../../utils/gameplayUtils/gamplayUtils';
import gamplayUtils from '../../utils/gameplayUtils/gamplayUtils';

function ChadTest() {
    const userID = "1";
    const startDate = '2020-11-20';
    const endDate = '2020-11-24';
    const [currentChallengeMealLog, setCurrentChallengeMealLog] = useState<IMealLog[]>([]);
    const [challengeMeals, setchallengeMeals] = useState<[][]>([]);
    const [totalVeggieArray, setTotalVeggieArray] = useState<string[]>([])
    const [uniqueVeggieArray, setuniqueVeggieArray] = useState<string[]>([]);
    const [currentBonusMultiplier, setCurrentBonusMultiplier] = useState<number>(1);
    // initial loading brings up the challenge specific mealLog.

    useEffect(() => {
        mealLogAPI.getChallengeMeallog(userID, startDate, endDate).then((data) => {
            setCurrentChallengeMealLog(data.data);
            console.log(currentChallengeMealLog);
            }).catch((err) => {
                console.log(err);
            });
        console.log(currentChallengeMealLog);
    }, []);

    // After meallog loads, this will reduce to just the array of meals.
    useEffect(() => {
        setchallengeMeals(challengeUtils.returnsChallengeMeals(currentChallengeMealLog));
        console.log(challengeMeals);

    }, [currentChallengeMealLog])

    // This gives us all of the veggies every eaten!  yum.
    useEffect(() => {
        setTotalVeggieArray(challengeUtils.totalVeggieArrayConstructor(challengeMeals));
        console.log(totalVeggieArray);
        setCurrentBonusMultiplier(challengeUtils.calculateMultiplierBonus(challengeMeals));
        console.log(currentBonusMultiplier);
    }, [challengeMeals])

    // This reduces the total veggies into unique veggies
    useEffect(() => {
        setuniqueVeggieArray(challengeUtils.uniqueVeggieArrayConstructor(totalVeggieArray));
        console.log(uniqueVeggieArray);
    }, [totalVeggieArray])




  return (
    <div>
      <Grid item xs={12} container justify="space-around">
        <DetailCard>
          Score= {
              
              gamplayUtils.scoreCalculator(uniqueVeggieArray, totalVeggieArray, currentBonusMultiplier)
          }
         
        </DetailCard>
        <DetailCard>
          <ul>
            <li>TOTAL HP: </li>
            <li>OFFENSE: </li>
            <li>DEFENSE: </li>
          </ul>

        </DetailCard>

      </Grid>

    </div>
  )

};

export default ChadTest;