import React, { useEffect, useState } from 'react';


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DetailCard from '../../components/DetailCard/DetailCard';
// import ChallengeStats from '../../components/ChallengeStats/ChallengeStats';
import ChallengeScore from '../../components/ChallengeScore/ChallengeScore';

import { DateTime } from 'luxon';

import { useStoreContext } from '../../state/GlobalState';

import IUser from '../../interfaces/IUser';
import INewChallenge from '../../interfaces/INewChallenge';
import IChallenge from '../../interfaces/IChallenge';

import { Link } from 'react-router-dom';

import './ChallengeDisplay.css'

import { calcChallenge } from '../../utils/gameplayUtils/calcChallenge';





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

        let playerOne: string;
        let playerTwo: string;

        if (props.position === 1) {
            playerOne = state.currentUser._id;
            playerTwo = props.currentChallenger!._id;
        } else {
            playerOne = props.currentChallenger!._id;
            playerTwo = state.currentUser._id;
        }

        calcChallenge(playerOne, playerTwo, state.currentUser.currentChallenge)
            .then((res: any) => {
                console.log("calcChallenge " + JSON.stringify(res))
                setCalcedChallenge(res);
                setIsLoading(false);
            })

    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }


    const startDate = DateTime.fromISO(props.currentChallenge!.dateStarted);
    const endDate = DateTime.fromISO(props.currentChallenge!.dateEnding);

    let playerOne;
    props.position === 1 ? playerOne = true : playerOne = false;

    return (
        <div className="challenge">

            {calcedChallenge && <div>

                <h2>{startDate.toFormat('LLL. dd yyyy')} - {endDate.toFormat('LLL. dd yyyy')}</h2>

                <Grid item xs={12} container justify="space-around">

                    <DetailCard>
                        <h3>{state.currentUser.nickname} Stats</h3>
                        <ChallengeScore multiplier={calcedChallenge!.playerOne_currentMultiplier} veggies={calcedChallenge!.playerOne_totalVeggies.length} unique={calcedChallenge!.playerOne_uniqueVeggies.length} score={calcedChallenge!.playerOne_currentScore} />
                    </DetailCard>

                    <DetailCard>
                        <h3>{props.currentChallenger!.nickname} Stats</h3>
                        <ChallengeScore multiplier={calcedChallenge!.playerTwo_currentMultiplier} veggies={calcedChallenge!.playerTwo_totalVeggies.length} unique={calcedChallenge!.playerTwo_uniqueVeggies.length} score={calcedChallenge!.playerTwo_currentScore} />
                    </DetailCard>

                </Grid>
            </div>}

            {!calcedChallenge && <div>Loading...</div>}


        </div>


    )

}

export default ChallengeDisplay;