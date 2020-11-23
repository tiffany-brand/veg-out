import React from 'react';
import logo from '../../assets/images/Vegemon-logo.png';

function OrientMsg(): JSX.Element {


    return (
        <div>
            <img width="300px" src={logo} alt="Vegemon" />
            <br></br>
            <h1>This app works best in landscape orientation.</h1>
            <p>Please turn your device</p>
        </div >
    );

}

export default OrientMsg;