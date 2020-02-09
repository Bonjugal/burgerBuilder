import axios from 'axios';

const axiosOrder = axios.create({
    baseURL: 'https://burgerbuilder-91a9c.firebaseio.com/'
});

export default axiosOrder;

axiosOrder.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000/';

