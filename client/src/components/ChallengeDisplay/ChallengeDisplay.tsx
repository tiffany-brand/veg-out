import React, { useEffect, useState } from 'react';


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DetailCard from '../../components/DetailCard/DetailCard';

import ChallengeScore from '../../components/ChallengeScore/ChallengeScore';

import { DateTime } from 'luxon';

import { useStoreContext } from '../../state/GlobalState';
import { SET_CURRENT_USER } from '../../state/actions';

import IUser from '../../interfaces/IUser';
import IChallenge from '../../interfaces/IChallenge';

import './ChallengeDisplay.css'

import { calcChallenge } from '../../utils/gameplayUtils/calcChallenge';

import userAPI from '../../utils/userAPI';



type Props = {
    currentChallenge: IChallenge | undefined;
    currentChallenger: IUser | undefined;
    position: number;
}

const ChallengeDisplay: React.FC<Props> = (props) => {

    const [state, dispatch] = useStoreContext();
    const [calcedChallenge, setCalcedChallenge] = useState<any>();

    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        // determine if the current user is player one or two
        let playerOne: string;
        let playerTwo: string;

        if (props.position === 1) {
            playerOne = state.currentUser._id;
            playerTwo = props.currentChallenger!._id;
        } else {
            playerOne = props.currentChallenger!._id;
            playerTwo = state.currentUser._id;
        }
        // calculate and save challenge stats for both players
        calcChallenge(playerOne, playerTwo, state.currentUser.currentChallenge)
            .then((res: any) => {

                setCalcedChallenge(res);
                setIsLoading(false);
            })

    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const today = DateTime.local();
    const startDate = DateTime.fromISO(props.currentChallenge!.dateStarted);
    const endDate = DateTime.fromISO(props.currentChallenge!.dateEnding);
    const challOn = today < endDate;

    let playerOne: boolean;
    props.position === 1 ? playerOne = true : playerOne = false;

    // When challenge is archived, calculate if it is a win, loss or tie
    const calcWin = () => {
        let playerTie = calcedChallenge!.playerOne_currentScore === calcedChallenge!.playerTwo_currentScore;
        let playerWinner = false;
        if (playerOne) {
            playerWinner = calcedChallenge!.playerOne_currentScore > calcedChallenge!.playerTwo_currentScore;
        } else {
            playerWinner = calcedChallenge!.playerTwo_currentScore > calcedChallenge!.playerOne_currentScore;
        }
        let win = 0;
        let loss = 0;
        let tie = 0;
        if (playerWinner) {
            win++
        } else if (playerTie) {
            tie++
        } else loss++

        return { win, loss, tie }
    }

    // set challenged to false and add win, loss, or tie - save to user in db
    const archiveChallenge = () => {
        const winLossTie = calcWin();
        const user = {
            ...state.currentUser,
            challenged: false,
            currentChallenge: "",
            wins: state.currentUser.wins! + winLossTie.win,
            losses: state.currentUser.losses! + winLossTie.loss,
            ties: state.currentUser.ties! + winLossTie.tie
        }
        userAPI.saveUser(user)
            .then((res) => {
                dispatch({
                    type: SET_CURRENT_USER,
                    currentUser: res.data
                })
            })
    }

    return (
        <div className="challenge">

            {calcedChallenge && <div>

                <h2 className="h2-pad-bottom">{startDate.toFormat('LLL. dd yyyy')} - {endDate.toFormat('LLL. dd yyyy')}</h2>

                {!challOn && <div>
                    <h3>Challenge Complete!</h3>
                    <Button variant="contained" onClick={() => archiveChallenge()}>Archive Challenge</Button>
                </div>}
                <Grid item xs={12} container justify="space-around">
                    <Grid item xs={12} md={6} className="pad-div-bottom">
                        <h3 className="underlined-header">{state.currentUser.nickname}'s Stats</h3>
                        {playerOne && <ChallengeScore multiplier={calcedChallenge!.playerOne_currentMultiplier} veggies={calcedChallenge!.playerOne_totalVeggies.length} unique={calcedChallenge!.playerOne_uniqueVeggies.length} score={calcedChallenge!.playerOne_currentScore} />}
                        {!playerOne && <ChallengeScore multiplier={calcedChallenge!.playerTwo_currentMultiplier} veggies={calcedChallenge!.playerTwo_totalVeggies.length} unique={calcedChallenge!.playerTwo_uniqueVeggies.length} score={calcedChallenge!.playerTwo_currentScore} />}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <h3 className="underlined-header">{props.currentChallenger!.nickname}'s Stats</h3>
                        {playerOne && <ChallengeScore multiplier={calcedChallenge!.playerTwo_currentMultiplier} veggies={calcedChallenge!.playerTwo_totalVeggies.length} unique={calcedChallenge!.playerTwo_uniqueVeggies.length} score={calcedChallenge!.playerTwo_currentScore} />}
                        {!playerOne && <ChallengeScore multiplier={calcedChallenge!.playerOne_currentMultiplier} veggies={calcedChallenge!.playerOne_totalVeggies.length} unique={calcedChallenge!.playerOne_uniqueVeggies.length} score={calcedChallenge!.playerOne_currentScore} />}
                    </Grid>
                </Grid>
            </div>}




            {!calcedChallenge && <div>Loading...</div>}


        </div>


    )

}

export default ChallengeDisplay;