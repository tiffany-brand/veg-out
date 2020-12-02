
import React, { useState, useEffect } from 'react';
import IChallenge from '../../interfaces/IChallenge';
import challengesAPI from '../../utils/challengesAPI';

export default function ChallengeScore(props: { multiplier: number, veggies: number, unique: number, score: number }) {

    const { multiplier, veggies, unique, score } = props;


    return (
        <div className="challenge-stats">
            <ul>
                <li>
                    Multiplier: {multiplier}
                </li>
                <li>
                    Veggies: {veggies}
                </li>
                <li>
                    Unique Veggies: {unique}
                </li>
                <li>
                    Score: {score}
                </li>
            </ul>


        </div>
    )

}