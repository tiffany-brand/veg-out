import axios from "axios";
import ICurrentUser from '../interfaces/ICurrentUser';

export default {

    // Gets all users
    getUsers: function () {
        return axios.get("/api/users");
    },
    // Gets the user with the given id
    getUser: function (id: string) {
        return axios.get("/api/users/" + id);
    },
    // Deletes the user with the given id
    deleteUser: function (id: string) {
        return axios.delete("/api/users/" + id);
    },
    // Saves a user to the database
    saveUser: function (userData: ICurrentUser) {
        return axios.post("/api/users", userData);
    }
};