import React from 'react';
import { render } from 'react-dom';
import { TestButton } from './TestButton';
import { TestButton2 } from './TestButton2';

// export default function ShowTheButton()
class ShowTheButton extends React.Component {

    render() {

        const isTrue = false;
        let button;

        if(isTrue) {
            button = <TestButton />;
        } else {
            button = <TestButton2 />;
        }

        return (
            <div>
                {button}
            </div>
        );
    };
}

export default ShowTheButton;