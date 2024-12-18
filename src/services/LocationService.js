import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_LOCATIONIQ_URL,
    headers: {
        Accept: 'application/json',
    },
});

export default {
    getCoordinates(address) {

        return http.get('', {
            params: {
                q: address,
                format: 'json',
            },
        });
    },
};
