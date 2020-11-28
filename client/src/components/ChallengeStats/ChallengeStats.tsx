// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import DetailCard from '../DetailCard/DetailCard';

// import { useStoreContext } from '../../state/GlobalState';
// import Grid from '@material-ui/core/Grid';
// import mealLogAPI from '../../utils/mealLogAPI';
// import userAPI from '../../utils/userAPI'
// import IMealLog from '../../interfaces/IMealLog';
// import IChallenge from '../../interfaces/IChallenge';
// import challengeUtils from '../../utils/gameplayUtils/gamplayUtils';
// import gamplayUtils from '../../utils/gameplayUtils/gamplayUtils';
// import challengesAPI from '../../utils/challengesAPI';
// import ChallengeScore from '../ChallengeScore/ChallengeScore';

// function ChallengeStats(props: { userID: string, startDate: string, endDate: string, playerOne: boolean }) {
//   const { userID, startDate, endDate, playerOne } = props;
//   const [state, dispatch] = useStoreContext();
//   console.log("playerOne" + playerOne);
//   const [currentChallengeMealLog, setCurrentChallengeMealLog] = useState<IMealLog[]>([]);
//   const [challengeMeals, setchallengeMeals] = useState<[][]>([]);
//   const [totalVeggieArray, setTotalVeggieArray] = useState<string[]>([])
//   const [uniqueVeggieArray, setuniqueVeggieArray] = useState<string[]>([]);
//   const [currentBonusMultiplier, setCurrentBonusMultiplier] = useState<number>(1);
//   const [currentUserStats, setCurrentUserStats] = useState<IChallenge>();
//   const [score, setScore] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState(true);
//   // initial loading brings up the challenge specific mealLog.

//   useEffect(() => {
//     mealLogAPI.getChallengeMeallog(userID, startDate, endDate).then((data) => {
//       setCurrentChallengeMealLog(data.data);
//     }).catch((err) => {
//       console.log(err);
//     });
//   }, []);

//   // After meallog loads, this will reduce to just the array of meals.
//   useEffect(() => {
//     setchallengeMeals(challengeUtils.returnsChallengeMeals(currentChallengeMealLog));
//   }, [currentChallengeMealLog])

//   // This gives us all of the veggies every eaten!  yum.
//   useEffect(() => {
//     setTotalVeggieArray(challengeUtils.totalVeggieArrayConstructor(challengeMeals));
//     setCurrentBonusMultiplier(challengeUtils.calculateMultiplierBonus(challengeMeals));
//   }, [challengeMeals])

//   // This reduces the total veggies into unique veggies
//   useEffect(() => {
//     setuniqueVeggieArray(challengeUtils.uniqueVeggieArrayConstructor(totalVeggieArray));
//   }, [totalVeggieArray])

//   useEffect(() => {
//     challengesAPI.getChallenge(state.currentUser.currentChallenge)
//       .then((res) => {

//         let challengerStats;
//         if (playerOne) {
//           challengerStats = {
//             _id: state.currentUser.currentChallenge,
//             ...res.data,
//             playerOne_totalVeggies: totalVeggieArray,
//             playerOne_uniqueVeggies: uniqueVeggieArray,
//             playerOne_currentMultiplier: currentBonusMultiplier,
//             playerOne_currentScore: gamplayUtils.scoreCalculator(uniqueVeggieArray, totalVeggieArray, currentBonusMultiplier)
//           }
//         } else {
//           challengerStats = {
//             _id: state.currentUser.currentChallenge,
//             ...res.data,
//             playerTwo_totalVeggies: totalVeggieArray,
//             playerTwo_uniqueVeggies: uniqueVeggieArray,
//             playerTwo_currentMultiplier: currentBonusMultiplier,
//             playerTwo_currentScore: gamplayUtils.scoreCalculator(uniqueVeggieArray, totalVeggieArray, currentBonusMultiplier)
//           }
//         }
//         // console.log("stats to save" + JSON.stringify(challengerStats))

//         setCurrentUserStats(challengerStats);
//         setScore(gamplayUtils.scoreCalculator(uniqueVeggieArray, totalVeggieArray, currentBonusMultiplier));
//         setIsLoading(false);
//       })
//       .catch(err => console.log(err))

//   }, [uniqueVeggieArray])


//   if (isLoading) {
//     return <div>Loading...</div>
//   }


//   // useEffect(() => {
//   //   if (currentUserStats) {
//   //     console.log("saving stats")
//   //     challengesAPI.saveChallenge(currentUserStats!)
//   //       .then(res => {
//   //         console.log(JSON.stringify(res.data))
//   //       })
//   //   }
//   // }, [currentUserStats])


//   return (

//     <ChallengeScore multiplier={currentBonusMultiplier} veggies={totalVeggieArray.length} unique={uniqueVeggieArray.length} score={score} />
//     // <div className="challenge-stats">
//     //   <ul>
//     //     <li>
//     //       Multiplier:{currentBonusMultiplier}
//     //     </li>
//     //     <li>
//     //       Veggies:{totalVeggieArray.length}
//     //     </li>
//     //     <li>
//     //       Unique Veggies:{uniqueVeggieArray.length}
//     //     </li>
//     //     <li>
//     //       Score:{gamplayUtils.scoreCalculator(uniqueVeggieArray, totalVeggieArray, currentBonusMultiplier)}
//     //     </li>
//     //   </ul>


//     // </div>
//   )

// };

// export default ChallengeStats;

export { }