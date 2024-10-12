import axios from 'axios';


const http = axios.create({
    baseURL: import.meta.env.VITE_WEATHER_URL,
    Headers: {
        'User-Agent': import.meta.env.VITE_USER_AGENT,
        'Accept': 'application/geo + json',
    }
})



export default {
    getForecast(wfo, xCoord, yCoord) {
        return http.get(`/gridpoints/${wfo}/${xCoord},${yCoord}/forecast`)
    },
    getCityName(latitude, longitude) {
        return http.get(`points/${latitude},${longitude}`)
    },
    getCurrentWeather(stationId) {
        return http.get(`stations/${stationId}/observations/latest`)
    },
    getDate() {

        let day = new Date().getDay();
        let month = new Date().getMonth();
        let date = new Date().getDate();
        let year = new Date().getFullYear();


        let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return dayName[day] + ", " + monthName[month] + " " + date + ", " + year;
    },

}



