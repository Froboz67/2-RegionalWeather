import axios from 'axios';
import { format } from "date-fns";

const http = axios.create({
    baseURL: import.meta.env.VITE_RCC_ACIS_URL,
    Headers: {
        'Content-Type': 'application/json',
    }
})

export default {
    getRecordStats() {
        let month = new Date().getMonth();
        let date = new Date().getDate();
        let year = new Date().getFullYear();

        let today = format(new Date(year, month, date), "yyyy-MM-dd").slice(5);
        // console.log(today);
        return today;
    },
    getRecordHigh(localSid) {
        const requestBody = {
            "sid": localSid,
            "sdate": "por",
            "edate": "por",
            "meta": ["name", "state"],
            "elems": [
                {
                    "name": "maxt",
                    "interval": [0, 0, 1],
                    "duration": 1,
                    "smry": {
                        "reduce": "max",
                        "add": "date"
                    },
                    "smry_only": 1,
                    "groupby": "year"
                }
            ]
        };
        return http.post('/StnData/', requestBody)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("error making post request", error);
                throw error;
            });
    },
    getRecordLow(localSid) {
        const requestBody = {
            "sid": localSid,
            "sdate": "por",
            "edate": "por",
            "meta": ["name", "state"],
            "elems": [
                {
                    "name": "mint",
                    "interval": [0, 0, 1],
                    "duration": 1,
                    "smry": {
                        "reduce": "min",
                        "add": "date"
                    },
                    "smry_only": 1,
                    "groupby": "year"
                }
            ]
        };
        return http.post('/StnData/', requestBody)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("error making post request", error);
                throw error;
            });
    },
}