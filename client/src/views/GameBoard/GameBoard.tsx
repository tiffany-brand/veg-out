import React from 'react';
import GameBoardImage from "../../svg/fight_club.gif";
import bunny from "../../svg/bunny.svg";
import caterpillar from "../../svg/caterpillar_trimmed.svg";
import ModalComponent from "../../components/ModalComponent/ModalComponent";

// need access to users character
// who will win
// win & lose animation based on score

// 

interface ICharacterData {
    name: string;
    url: string;
  }
  


const GameBoard: React.FC<ICharacterData> = () => {

    const styles = {
        background: GameBoardImage,
    }

    let characterData = [
        {
            name: "bunny",
            url: bunny,
        },
        {
            name: "caterpillar of death",
            url: caterpillar,
        },
    ];

    return (
        <div>
            <img src={styles.background} alt="Game Board" />
            <img src={characterData[0].url} alt={characterData[0].name} />
            <img src={characterData[1].url} alt={characterData[1].name} />
            <ModalComponent />
        </div>
    );
}

export default GameBoard;