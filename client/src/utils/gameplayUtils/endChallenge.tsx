import challengesAPI from '../challengesAPI';

import { DateTime } from 'luxon';


export const endChallenge = (user: string, challengeId: string, position: number) => {
    return new Promise((resolve, reject) => {

        const today = DateTime.local()
        let challOn: boolean = true;
        challengesAPI.getChallenge(challengeId)
            .then((res) => {
                // check to see if challenge is over
                const dateEnding = DateTime.fromISO(res.data.dateEnding);
                if (dateEnding < today) {
                    challOn = false
                } else {
                    challOn = true
                }
                resolve(challOn)
            })
            .catch(err => {
                reject(err);
            })

    })

}


