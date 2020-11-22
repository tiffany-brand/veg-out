import React from 'react';
import { CaterpillarComponent } from './CaterpillarComponent';
import { Bunny } from './Bunny';

class CharacterClass extends React.Component {

    render() {

        const isTrue = true;
        let characterImage;

        if(isTrue) {
            characterImage = <Bunny />
        } else {
            characterImage = <CaterpillarComponent />;
        }

        return (
            <>
                {characterImage}
            </>
        );
    };
}

export default CharacterClass;