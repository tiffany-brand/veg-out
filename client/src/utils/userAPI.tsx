import axios from "axios";
import IUser from '../interfaces/IUser';
import INewUser from '../interfaces/INewUser';

export default {

    // Gets all users
    getUsers: function () {
        return axios.get("/api/users");
    },
    // Gets the user with the given id
    getUser: function (id: string | undefined) {
        return axios.get("/api/users/" + id);
    },
    // Deletes the user with the given id
    deleteUser: function (id: string) {
        return axios.delete("/api/users/" + id);
    },
    // Saves a user to the database
    saveUser: function (userData: IUser | INewUser) {
        return axios.post("/api/users", userData);
    },
    // Gets the user with the give Auth0 id
    getAuthUser: function (auth0ID: string) {
        return axios.get("/api/users/auth/" + auth0ID);
    }

};