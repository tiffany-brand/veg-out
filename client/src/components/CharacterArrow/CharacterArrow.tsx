import React from 'react';
import "./CharacterArrow.css";

interface IProps {
    direction: any;
    clickFunction: any;
    glyph: any;
}

const CharacterArrow: React.FC<IProps> = (props: IProps) => (
    <div 
        className={ `slide-arrow ${props.direction}` }
        onClick={ props.clickFunction }>{ props.glyph }</div>
);

export default CharacterArrow;