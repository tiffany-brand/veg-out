import axios from "axios";
import IMealLog from "../interfaces/IMealLog";


export default {

    // Gets all Meal Logs
    getMealLogs: function () {
        return axios.get("/api/meallog");
    },
    // Gets the Meal Log with the given id
    getMealLog: function (id: string) {
        return axios.get("/api/meallog/" + id);
    },
    // Deletes the Meal Log with the given id
    deleteMealLog: function (id: string) {
        return axios.delete("/api/meallog/" + id);
    },
    // Saves a Meal Log to the database
    saveMealLog: function (meallogData: IMealLog) {
        return axios.post("/api/meallog", meallogData);
    },

    getChallengeMeallog: function(userID: string, startDate: string, endDate: string) {
        return axios.post("/api/meallog/dates", {userID, startDate, endDate});
    }
};