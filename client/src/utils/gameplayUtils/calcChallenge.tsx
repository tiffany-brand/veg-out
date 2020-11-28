import challengesAPI from '../challengesAPI';
import mealLogAPI from '../mealLogAPI';
import challengeUtils from '../gameplayUtils/gamplayUtils';




export const calcChallenge = (playerOne: string, playerTwo: string, challengeId: string) => {

    return new Promise((resolve, reject) => {

        challengesAPI.getChallenge(challengeId)
            .then((res) => {
                const { dateStarted, dateEnding } = res.data;
                // get meallogs from players
                Promise.all([mealLogAPI.getChallengeMeallog(playerOne, dateStarted, dateEnding), mealLogAPI.getChallengeMeallog(playerTwo, dateStarted, dateEnding)])
                    .then(([playerOneRes, playerTwoRes]) => {
                        const playerOneMealLog = playerOneRes.data;
                        const playerTwoMealLog = playerTwoRes.data;
                        // reduce to array of meals
                        const playerOneMeals = challengeUtils.returnsChallengeMeals(playerOneMealLog);
                        const playerTwoMeals = challengeUtils.returnsChallengeMeals(playerTwoMealLog);
                        // all veggies ever eaten - yum!
                        const playerOneTotalVeggieArr = challengeUtils.totalVeggieArrayConstructor(playerOneMeals);
                        const playerTwoTotalVeggieArr = challengeUtils.totalVeggieArrayConstructor(playerTwoMeals);
                        // calculate bonus multiplier
                        const playerOneMultiplier = challengeUtils.calculateMultiplierBonus(playerOneMeals);
                        const playerTwoMultiplier = challengeUtils.calculateMultiplierBonus(playerTwoMeals);
                        // reduce total veggies into unique veggies
                        const playerOneUnique = challengeUtils.uniqueVeggieArrayConstructor(playerOneTotalVeggieArr);
                        const playerTwoUnique = challengeUtils.uniqueVeggieArrayConstructor(playerTwoTotalVeggieArr);
                        // calculate scores
                        const playerOneScore = challengeUtils.scoreCalculator(playerOneUnique, playerOneTotalVeggieArr, playerOneMultiplier)
                        const playerTwoScore = challengeUtils.scoreCalculator(playerTwoUnique, playerTwoTotalVeggieArr, playerTwoMultiplier)

                        // Save stats to challenge in DB
                        const scoredChallenge = {
                            _id: challengeId,
                            dateStarted: dateStarted,
                            dateEnding: dateEnding,
                            playerOne_totalVeggies: playerOneTotalVeggieArr,
                            playerOne_uniqueVeggies: playerOneUnique,
                            playerOne_currentMultiplier: playerOneMultiplier,
                            playerOne_currentScore: playerOneScore,
                            playerTwo_totalVeggies: playerTwoTotalVeggieArr,
                            playerTwo_uniqueVeggies: playerTwoUnique,
                            playerTwo_currentMultiplier: playerTwoMultiplier,
                            playerTwo_currentScore: playerTwoScore,
                            playerOne: playerOne,
                            playerTwo: playerTwo
                        }
                        challengesAPI.saveChallenge(scoredChallenge)
                            .then((res) => {
                                resolve(res.data)
                            })

                    })
            })
            .catch(err => reject(err));

    })

}