import axios from 'axios';
export default axios.create({
    /**@NOTE baseURL refers to the baseURL of the backend, not frontend */
    baseURL: process.env.ENVIRONMENT === "development" ? 'http://localhost:3000/' : process.env.HOST,
    withCredentials: true
});