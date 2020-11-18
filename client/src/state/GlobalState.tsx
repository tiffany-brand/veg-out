import React, { createContext, useReducer, useContext } from "react";
import ICurrentUser from "../interfaces/ICurrentUser";
import IPlayerCharacter from "../interfaces/IPlayerCharacter";

import {
    SET_CURRENT_USER,
    SET_CHARACTER,
    LOADING
} from "./actions";

type State = {
    currentUser: ICurrentUser;
    userCharacter: IPlayerCharacter;
    loading: boolean;
}

type Action =
    | { type: 'SET_CURRENT_USER', currentUser: ICurrentUser }
    | { type: 'SET_CHARACTER', userCharacter: IPlayerCharacter }
    | { type: 'LOADING' };

const initialState: State = {
    currentUser: {
        _id: "",
        email: "",
        auth0ID: "",
        firstName: "",
        lastName: "",
        username: ""
    },
    userCharacter: {
        _id: "",
        character_id: "",
        currentdefense: 0,
        currentoffense: 0,
        currenthealth: 0,
        character_name: "",
        user_id: ""
    },
    loading: false
}

const StoreContext = createContext<[State, React.Dispatch<any>]>([initialState, () => null]);
const { Provider } = StoreContext;

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser,
                loading: false
            };

        case SET_CHARACTER:
            return {
                ...state,
                userCharacter: action.userCharacter,
                loading: false
            };

        case LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
};

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
