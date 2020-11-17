import axios from "axios";
import IPlayerCharacter from "../interfaces/IPlayerCharacter";


export default {

    // Gets all Player Characters
    getPlayerCharacters: function () {
        return axios.get("/api/playercharacter");
    },
    // Gets the Player Character with the given id
    getPlayerCharacter: function (id: string) {
        return axios.get("/api/playercharacter/" + id);
    },
    // Deletes the Player Character with the given id
    deletePlayerCharacter: function (id: string) {
        return axios.delete("/api/playercharacter/" + id);
    },
    // Saves a Player Character to the database
    savePlayerCharacter: function (pcData: IPlayerCharacter) {
        return axios.post("/api/playercharacter", pcData);
    },


};