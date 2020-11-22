import React from 'react';
import { CaterpillarComponent } from './CaterpillarComponent';
import { Bunny } from './Bunny';

interface IProps {
    character_name: string | undefined;
}

class CharacterClass extends React.Component<IProps> {

    render() {
        let characterChoice = this.props.character_name;
        let characterImage;

        if (characterChoice !== undefined) {
            if (characterChoice === "Crackdown Caterpillar") {
                characterImage = <CaterpillarComponent />
            } else if (characterChoice === "Boxin Bunny") {
                characterImage = <Bunny />
            }
          };

        return (
            <>
                {characterImage}
            </>
        );
    };
}

export default CharacterClass;