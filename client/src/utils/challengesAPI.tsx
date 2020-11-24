import axios from "axios";
import IChallenges from "../interfaces/IChallenges";
import IChallNew from "../interfaces/IChallNew";


export default {

    // Gets all Challenges
    getChallenges: function () {
        return axios.get("/api/challenges");
    },
    // Gets the Challenge with the given id
    getChallenge: function (id: string) {
        return axios.get("/api/challenges/" + id);
    },
    // Deletes the Challenge with the given id
    deleteChallenge: function (id: string) {
        return axios.delete("/api/challenges/" + id);
    },
    // Saves a Challenge to the database
    saveChallenge: function (challengeData: IChallenges) {
        return axios.post("/api/challenges", challengeData);
    },

    // Saves a Challenge to the database
    saveChall: function (challData: IChallNew) {
        return axios.post("/api/challenges", challData);
    },


};