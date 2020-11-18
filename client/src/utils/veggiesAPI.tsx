import axios from "axios";
import IVeggies from "../interfaces/IVeggies";


export default {

    // Gets all Veggies
    getVeggies: function () {
        return axios.get("/api/veggies");
    },
    // Gets the Veggies with the given id
    getVeggie: function (id: string) {
        return axios.get("/api/veggies/" + id);
    },
    // Deletes the Veggies with the given id
    deleteVeggie: function (id: string) {
        return axios.delete("/api/veggies/" + id);
    },
    // Saves a Veggies to the database
    saveVeggie: function (veggieData: IVeggies) {
        return axios.post("/api/veggies", veggieData);
    },


};