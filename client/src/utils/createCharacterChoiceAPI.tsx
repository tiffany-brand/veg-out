import axios from "axios";
import ICharacterChoices from "../interfaces/ICharacterChoices";


export default {

    // Gets all Character Choices
    getCharacterChoices: function () {
        return axios.get("/api/characterchoices");
    },
    // Gets the Character Choice with the given id
    getCharacterChoice: function (id: string) {
        return axios.get("/api/characterchoices/" + id);
    },
    // Deletes the Character Choice with the given id
    deleteCharacterChoice: function (id: string) {
        return axios.delete("/api/characterchoices/" + id);
    },
    // Saves a Character Choice to the database
    saveCharacterChoice: function (charchoiceData: ICharacterChoices) {
        return axios.post("/api/characterchoices", charchoiceData);
    },


};