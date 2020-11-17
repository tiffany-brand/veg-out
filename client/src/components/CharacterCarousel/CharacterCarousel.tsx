import React, { useState } from 'react';
import CharacterArrow from '../CharacterArrow/CharacterArrow';
import CharacterSlide from '../CharacterSlide/CharacterSlide';
import "./CharacterCarousel.css";

import bunny from "../../svg/bunny.svg";
import caterpillar from "../../svg/caterpillar.svg";



const CharacterCarousel: React.FC<{}> = () =>  {
    let imgUrls = [bunny, caterpillar];

    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    
    const previousCharacter = () => {
        const lastCharacter = imgUrls.length - 1;
        const shouldResetCharacterIndex = currentCharacterIndex === 0;
        const index = shouldResetCharacterIndex ? lastCharacter : currentCharacterIndex - 1;

        setCurrentCharacterIndex(index);
    }

    const nextCharacter = () => {
        const lastCharacter = imgUrls.length - 1;
        const shouldResetCharacterIndex = currentCharacterIndex === lastCharacter;
        const index = shouldResetCharacterIndex ? 0 : currentCharacterIndex + 1;

        setCurrentCharacterIndex(index);
    }

    return (
        <div className="carousel-grid">
            <h1>Choose Your Character</h1>
            <div className="character-carousel">
                <div className="left-arrow">
                    <CharacterArrow direction="left" clickFunction={ previousCharacter } glyph="&#9664;" />
                </div>
                <CharacterSlide url={ imgUrls[currentCharacterIndex] } />
                <div className="right-arrow">
                    <CharacterArrow direction="right" clickFunction={ nextCharacter } glyph="&#9654;" />
                </div>
            </div>
        </div>
    );
}

export default CharacterCarousel;