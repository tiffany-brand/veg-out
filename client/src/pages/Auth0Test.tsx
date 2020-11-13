import React from 'react';
import { withRouter } from 'react-router-dom';
import Login from '../components/Auth0Test/Login';


function Auth0Test(): JSX.Element {



    return (
        <div>
            <Login />

        </div >
    );

}
export default withRouter(Auth0Test)