import React, { useEffect, useState } from 'react';


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DetailCard from '../../components/DetailCard/DetailCard';
import ChallengeStats from '../../components/ChallengeStats/ChallengeStats';

import { DateTime } from 'luxon';

import { useStoreContext } from '../../state/GlobalState';

import IUser from '../../interfaces/IUser';
import INewChallenge from '../../interfaces/INewChallenge';
import IChallenge from '../../interfaces/IChallenge';

import { Link } from 'react-router-dom';

import './ChallengeDisplay.css'



type Props = {
    currentChallenge: IChallenge | undefined;
    currentChallenger: IUser | undefined;
    position: number;
}

const ChallengeDisplay: React.FC<Props> = (props) => {

    const [state, dispatch] = useStoreContext();

    console.log(props.currentChallenger)

    const startDate = DateTime.fromISO(props.currentChallenge!.dateStarted);
    const endDate = DateTime.fromISO(props.currentChallenge!.dateEnding);

    return (
        <div className="challenge">

            <h2>{startDate.toFormat('LLL. dd yyyy')} - {endDate.toFormat('LLL. dd yyyy')}</h2>

            <Grid item xs={12} container justify="space-around">

                <DetailCard>
                    <h3>{state.currentUser.nickname} Stats</h3>
                    <ChallengeStats userID={state.currentUser._id} startDate={startDate.toFormat('yyyyLLdd')} endDate={endDate.toFormat('yyyyLLdd')} />
                </DetailCard>

                <DetailCard>
                    <h3>{props.currentChallenger!.nickname} Stats</h3>
                    <ChallengeStats userID={props.currentChallenger!._id} startDate={startDate.toFormat('yyyyLLdd')} endDate={endDate.toFormat('yyyyLLdd')} />
                </DetailCard>

            </Grid>


        </div>


    )

}

export default ChallengeDisplay;