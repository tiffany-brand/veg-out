import React from "react";

import IScore from '../../interfaces/IScore';


type Props = {
    scores: IScore[];
}

const LeaderTable: React.FC<Props> = ({ scores }) => {

    return (


        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {
                    scores.map((score, i) => {
                        return <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{score.nickname}</td>
                            <td>{score.score}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>


    )

}

export default LeaderTable;