import axios from 'axios';
export default axios.create({
    /**@NOTE baseURL refers to the baseURL of the backend, not frontend */
    baseURL: 'https://get-server-prod.herokuapp.com/'
});