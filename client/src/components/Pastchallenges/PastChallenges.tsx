import React, { useState, useEffect } from 'react';
import { useStoreContext } from '../../state/GlobalState';
import challengesAPI from '../../utils/challengesAPI';

// Structural imports
import Grid from '@material-ui/core/Grid';

function PastChallenges() {

    const [state, dispatch] = useStoreContext();

    const [pastArray, setPastArray] = useState<any>([]);


    const [isLoading, setIsLoading] = useState<any>(true);





    useEffect(() => {

        let tempArray: any = [];

        challengesAPI.getChallenges().then((res) => {

            res.data.forEach((item: { _id: string, playerOne: { _id: string; }; playerTwo: { _id: string; }; }) => {
                if (item.playerOne._id == state.currentUser._id && state.currentUser.currentChallenge !== item._id || item.playerTwo._id == state.currentUser._id && state.currentUser.currentChallenge !== item._id) {
                    tempArray.push(item);
                }
            });
            setPastArray(tempArray);
            setIsLoading(false);

        }
        ).catch(err => console.log(err));

    }, []);


    if (isLoading || pastArray === undefined) {
        return (<div>
            Loading...
        </div>)
    }

    else {


        return (
            <div>
                <h2>Current Record:</h2>
                <br />
                <p> Wins: {state.currentUser.wins}</p>
                <br />
                <p> Losses: {state.currentUser.losses}</p>
                <br />
                <p> Ties: {state.currentUser.ties}</p>
                <br />
                <h2>Past Challenge Details:</h2>
                <br />
                <Grid item xs={12} spacing={6} container className="component-style" justify="space-around">
                    {pastArray.map((item: { _id: any, dateEnding: any; playerOne: { nickname: any; }; playerOne_currentScore: any; playerTwo: { nickname: any; }; playerTwo_currentScore: any; }) =>

                        <Grid key={item._id} className="past-challenge-container" item xs={12} md={6}>

                            <h3>Ended {item.dateEnding}</h3>
                            <br />
                            <p>Player One: {item.playerOne.nickname}
                                <br />
                Score: {item.playerOne_currentScore}
                                <br />

                Player Two: {item.playerTwo.nickname}
                                <br />

                Score: {item.playerTwo_currentScore}

                            </p>
                        </Grid>


                    )}

                </Grid>
            </div>
        )

    }

}



export default PastChallenges;