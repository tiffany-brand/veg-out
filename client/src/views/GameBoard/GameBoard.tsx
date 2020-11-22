import React from 'react';
import GameBoardImage from "../../svg/fight_club.gif";
import bunny from "../../svg/bunny.svg";
import caterpillar from "../../svg/caterpillar_trimmed.svg";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import CharacterAPI from "../../utils/playercharacterAPI";
import { TestButtonParent } from '../../components/Test/TestButtonParent';


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

    console.log(CharacterAPI.getPlayerCharacters());



    return (
        <div>
            <img src={styles.background} alt="Game Board" />
            <img src={characterData[0].url} alt={characterData[0].name} />
            <img src={characterData[1].url} alt={characterData[1].name} />
            <ModalComponent />
            <TestButtonParent />
        </div>
    );
}

export default GameBoard;