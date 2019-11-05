import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myfood-9ebd1.firebaseio.com/'
});

export default instance;