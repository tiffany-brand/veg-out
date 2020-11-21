import React from 'react';
import { TestButton } from './TestButton';
// import { TestButton2 } from './TestButton2';
// import { LeafButton } from './Leaf';
import { CaterpillarComponent } from './CaterpillarComponent';

// export default function ShowTheButton()
class ShowTheButton extends React.Component {

    render() {

        const isTrue = true;
        let button;

        if(isTrue) {
            button = <TestButton />;
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