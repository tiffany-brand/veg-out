import React from "react";

const CurrentUserContext = React.createContext({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    auth0ID: "",
    userName: ""
});

export default CurrentUserContext;
