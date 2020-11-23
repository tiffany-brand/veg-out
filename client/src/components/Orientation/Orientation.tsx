import React, { useState, useEffect } from 'react';
import OrientMsg from './OrientMsg';

// component detects device orientation and prompts user to change device to landscape

function detectOrientation() {
    let orientation = window.screen.orientation;
    console.log(orientation);

    if (orientation.type === "portrait-primary" || orientation.type === "portrait-secondary") {
        return "portrait"
    } else return "landscape"

}

const Orientation: React.FC = ({ children }) => {

    const [orientation, setOrientation] = useState("")

    useEffect(() => {
        window.addEventListener("orientationchange", function () {
            setOrientation(detectOrientation())

        }, false);

    }, [orientation])

    if (orientation === "portrait") {
        return <OrientMsg />
    } else return <>{children}</>;
};

export default Orientation;