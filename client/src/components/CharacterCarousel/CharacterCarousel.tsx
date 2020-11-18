import React, { useState } from 'react';
import CharacterArrow from '../CharacterArrow/CharacterArrow';
import CharacterSlide from '../CharacterSlide/CharacterSlide';
import "./CharacterCarousel.css";

import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import bunny from "../../svg/bunny.svg";
import caterpillar from "../../svg/caterpillar_trimmed.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    center: {
        textAlign: 'center',
        alignContent: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))

const CharacterCarousel: React.FC<{}> = () =>  {

    const classes = useStyles();

    let characterChoices = [
        {
            name: "bunny",
            url: bunny,
        },
        {
            name: "caterpillar of death",
            url: caterpillar,
        },
    ];

    let imgUrls = [characterChoices[0].url, characterChoices[1].url];


    // first in array is a state prop : interface state current... , set replaces this.setState... = useState : this.setState = 0
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

    let characterChoice = characterChoices[currentCharacterIndex].name;

    return (
        <Grid container spacing={3} className="carousel-grid">
            <Grid item xs={12}>
                <h1>Choose Your Character</h1>
            </Grid>
            <div className="character-carousel">
                <div className="left-arrow">
                    <CharacterArrow direction="left" clickFunction={ previousCharacter } glyph="&#9664;" />
                </div>
                <div className={classes.center}>
                   <CharacterSlide url={ imgUrls[currentCharacterIndex] } />
                </div>
                <div className="right-arrow">
                    <CharacterArrow direction="right" clickFunction={ nextCharacter } glyph="&#9654;" />
                </div>
            </div>
            <Grid item xs={12}>
                <h1>{characterChoice}</h1>
            </Grid>
        </Grid>
    );
}

export default CharacterCarousel;