import React, { useEffect, useState } from 'react';


import Grid from '@material-ui/core/Grid';


import { useStoreContext } from '../../state/GlobalState';

import IScore from '../../interfaces/IScore';


import challengesAPI from '../../utils/challengesAPI';

import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/persistUser';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { SET_CURRENT_USER } from '../../state/actions';


import LeaderTable from '../../components/LeaderTable/LeaderTable';

import './Leaderboard.css';




function Leaderboard() {


    const [state, dispatch] = useStoreContext();

    const [allScores, setAllScores] = useState<IScore[]>([]);

    const [isLoading, setIsLoading] = useState(true);


    // loads state from local storage if page is refreshed
    useEffect(() => {
        if (!state.currentUser._id) {
            const storedState = loadFromLocalStorage()
            dispatch({
                type: SET_CURRENT_USER,
                currentUser: storedState.currentUser
            });
        } else saveToLocalStorage(state);

    }, [])

    // load challenges
    useEffect(() => {
        let challArr: IScore[] = [];
        // load challenges from db
        challengesAPI.getChallenges()
            .then(res => {
                // push players and scores from challenges to an array
                res.data.map((chall: any) => {
                    challArr.push({ nickname: chall.playerOne.nickname, score: chall.playerOne_currentScore });
                    challArr.push({ nickname: chall.playerTwo.nickname, score: chall.playerTwo_currentScore });
                })
                // remove any scores of 0
                const filteredChallArr = challArr.filter((chall: IScore) => {
                    return chall.score !== 0
                })
                // sort the scores highest to lowest
                filteredChallArr.sort(function (a, b) {
                    return b.score - a.score;
                })
                // slice the top ten and save in state
                const topTenArr: IScore[] = filteredChallArr.slice(0, 10)
                setAllScores(topTenArr);

                setIsLoading(false)
            })

    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    // display a table of the top 10 scores
    return (
        <div>

            <h2 className="view-title">Leaderboard</h2>

            <div className="leaderboard-dark-box">
                <Grid item xs={12} container className="component-style" justify="space-around">
                    {allScores[0] &&
                        <Grid item xs={12} md={8} container justify="center">

                            <LeaderTable scores={allScores} />

                        </Grid>
                    }
                </Grid>
            </div>

        </div>
    )
}

export default withAuthenticationRequired(Leaderboard, {
    onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});