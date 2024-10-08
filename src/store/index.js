import { createStore as _createStore } from 'vuex';

export function createStore() {
    return _createStore({
        state: {
            weatherData: {
                fairfield: {
                    stationId: "KHAO",
                    wfo: "ILN",
                    xCoor: 34,
                    yCoor: 50,
                    longitude: -84.5427,
                    latitude: 39.3314
                },
                athens: {
                    stationId: "KPKB",
                    wfo: "RLX",
                    xCoor: 43,
                    yCoor: 109,
                    longitude: -82.098,
                    latitude: 39.326
                },
                portland: {
                    stationId: "KPDX",
                    wfo: "PQR",
                    xCoor: 115,
                    yCoor: 105,
                    longitude: -122.6499,
                    latitude: 45.5369
                },
                tuscon: {
                    stationId: "KTUS",
                    wfo: "TWC",
                    xCoor: 91,
                    yCoor: 49,
                    longitude: -110.96912,
                    latitude: 32.195447
                }

            },
            currentCity: "",
        },
        mutations: {
            setCurrentCity(state, cityName) {
                state.currentCity = cityName;
            }
        },
        getters: {
            currentCityData(state) {
                return state.weatherData[state.currentCity];
            }
        },
    });

}