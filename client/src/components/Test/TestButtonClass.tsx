import React from 'react';
import { TestButton } from './TestButton';
// import { TestButton2 } from './TestButton2';
// import { LeafButton } from './Leaf';
import { CaterpillarComponent } from '../Characters/CaterpillarComponent';
// import { Border } from './Border';
import Bunny from '../Characters/Bunny/Bunny';

// export default function ShowTheButton()
class ShowTheButton extends React.Component {

    render() {

        const isTrue = true;
        let button;

        if(isTrue) {
            // button = <Bunny />
        } else {
            button = <CaterpillarComponent />;
        }

        return (
            <>
                {button}
            </>
        );
    };
}

export default ShowTheButton;