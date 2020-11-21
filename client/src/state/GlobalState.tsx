import React, { createContext, useReducer, useContext } from "react";
import ICurrentUser from "../interfaces/ICurrentUser";
import IPlayerCharacter from "../interfaces/IPlayerCharacter";
import IChallenges from "../interfaces/IChallenges"


import {
    SET_CURRENT_USER,
    SET_CHARACTER,
    SET_CHALLENGES,
    LOADING
} from "./actions";

type State = {
    currentUser: ICurrentUser;
    userCharacter: IPlayerCharacter; 
    challenges: IChallenges
    loading: boolean;
   
}

type Action =
    | { type: 'SET_CURRENT_USER', currentUser: ICurrentUser }
    | { type: 'SET_CHARACTER', userCharacter: IPlayerCharacter }
    | {type: 'SET_CHALLENGES', challenges: IChallenges}
    | { type: 'LOADING' };

const initialState: State = {
    currentUser: {
        _id: "",
        email: "",
        auth0ID: "",
        username: "",
        character_name: "",
        character_image: "",
        character_id: "",
        challenged: false,
        currentChallenge: 0,
        currenthealth: 0,
        currentoffense: 0,
        currentdefense: 0,
        win: 0,
        loss: 0,
        tie: 0,
        level: 1

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
    challenges: {

        date_started: "",
        player_one: {},
        player_one_health: 0,
        player_one_offense: 0,
        player_one_defense: 0,
        player_one_plantTotal: 0,
        player_two: {},

        player_two_health: 0,
        player_two_offense: 0,
        player_two_defense: 0,
        player_two_plantTotal: 0,
        date_ending: "",

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

        case SET_CHALLENGES:
            return {
                ...state,
                challenges: action.challenges,
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
