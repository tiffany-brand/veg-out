import React from 'react';
import "./Register.css";

const Register: React.FC<{}> = () => {
    return (
        <div className="register-rows">
            <h1>Register</h1>
            <div className="register-columns">
                <input type="text" placeholder="Name"></input>
                <input type="text" placeholder="Username"></input>
                <input type="text" placeholder="Email"></input>
                <input type="text" placeholder="Password"></input>
            </div>
        </div>
    );
}

export default Register;