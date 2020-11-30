import React, { useState } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import { useStoreContext } from '../../state/GlobalState';
import challengesAPI from '../../utils/challengesAPI';


function PastChallenges() {

    const [state, dispatch] = useStoreContext();

    const [pastArray, setPastArray] = useState<any>();

    const [isLoading, setIsLoading] = useState<boolean>();

    let tempArray: any = [];



    if (isLoading !== false) {


        challengesAPI.getChallenges().then((res) => {
            
            res.data.forEach((item: { _id: any, playerOne: { _id: string; }; playerTwo: { _id: string; }; }) => {
                if (item.playerOne._id == state.currentUser._id && state.currentUser.currentChallenge !== item._id|| item.playerTwo._id == state.currentUser._id && state.currentUser.currentChallenge !== item._id) {
                    tempArray.push(item);
                };
                setPastArray(tempArray);
                setIsLoading(false);
            })
        }).catch(err => console.log(err));

        return (
            <div>
                Loading...
            </div>
        )
    }
    else {
        
        return (
            <div>

            

                {pastArray.map((item:any) => (                   
                     <DetailCard children={ 
                         <div>
                        <h3>Ended On {item.dateEnding}</h3>
                        <br />
                        <p>Player One: {item.playerOne.nickname}
                            <br />
            Score: {item.playerOne_currentScore}
                            <br />

            Player Two: {item.playerTwo.nickname}
                            <br />

            Score: {item.playerTwo_currentScore}

                        </p>
                        </div>}
                 />))}


            </div>
        )
    }

}

export default PastChallenges;