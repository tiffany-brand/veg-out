import React from 'react';
import './CharacterClass';
import CharacterClass from './CharacterClass';

interface IProps {
    character_name: string | undefined;
  }

export function CharacterClassParent(props: IProps) {
    const imageWidth = "1000px";
    const imageHeight = "100%";

    return (
        <div style={{ height: imageHeight, display: "flex"}}>
            <div style={{width: imageWidth}}>
                {/* <CharacterClass /> */}
            </div>
        </div>
    )
}