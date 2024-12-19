import { createStore as _createStore } from 'vuex';

export function createStore() {
    return _createStore({
        state: {
            weatherData: {
                hamilton: {
                    localSid: "CVGthr",
                    stationId: "KHAO",
                    wfo: "ILN",
                    xCoor: 33,
                    yCoor: 51,
                    longitude: -84.5657,
                    latitude: 39.3934
                },
                athens: {
                    localSid: "ATHO1thr",
                    stationId: "KPKB",
                    wfo: "RLX",
                    xCoor: 43,
                    yCoor: 109,
                    longitude: -82.098,
                    latitude: 39.326
                },
                portland: {
                    localSid: "PDXthr",
                    stationId: "KPDX",
                    wfo: "PQR",
                    xCoor: 115,
                    yCoor: 105,
                    longitude: -122.6499,
                    latitude: 45.5369
                },
                tuscon: {
                    localSid: "TUSthr",
                    stationId: "KTUS",
                    wfo: "TWC",
                    xCoor: 91,
                    yCoor: 49,
                    longitude: -110.96912,
                    latitude: 32.195447
                },
                chicago: {
                    localSid: "ORDthr",
                    stationId: "KLOT",
                    wfo: "LOT",
                    xCoor: 72,
                    yCoor: 68,
                    longitude: -87.7725,
                    latitude: 41.7677
                }

            },
            newWeatherData: [
                {
                    city: "hamilton",
                    localSid: "CVGthr",
                    stationId: "KHAO",
                    wfo: "ILN",
                    xCoor: 33,
                    yCoor: 51,
                    longitude: -84.5657,
                    latitude: 39.3934
                },
                {
                    city: "athens",
                    localSid: "ATHO1thr",
                    stationId: "KPKB",
                    wfo: "RLX",
                    xCoor: 43,
                    yCoor: 109,
                    longitude: -82.098,
                    latitude: 39.326
                },
                {
                    city: "portland",
                    localSid: "PDXthr",
                    stationId: "KPDX",
                    wfo: "PQR",
                    xCoor: 115,
                    yCoor: 105,
                    longitude: -122.6499,
                    latitude: 45.5369
                },
                {
                    city: "tuscon",
                    localSid: "TUSthr",
                    stationId: "KTUS",
                    wfo: "TWC",
                    xCoor: 91,
                    yCoor: 49,
                    longitude: -110.96912,
                    latitude: 32.195447
                },
                {
                    city: "chicago",
                    localSid: "ORDthr",
                    stationId: "KLOT",
                    wfo: "LOT",
                    xCoor: 72,
                    yCoor: 68,
                    longitude: -87.7725,
                    latitude: 41.7677
                }

            ],
            currentCity: "",
        },
        mutations: {
            setCurrentCity(state, cityName) {
                console.log("currentCity", state.currentCity = cityName);
                state.currentCity = cityName;
            },
            setUpdateCityData(state, payload) {
                state.weatherData = {
                    weatherData: payload.cityData,
                }
                console.log("Update weatherData: ", state.weatherData);
            }
        },
        getters: {
            currentCityData(state) {
                console.log("currentCityData", state.weatherData[state.currentCity]);
                return state.weatherData[state.currentCity];
            }
        },
    });

}