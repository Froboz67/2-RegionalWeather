import { createStore as _createStore } from 'vuex';

export function createStore() {
    return _createStore({
        state: {
            weatherData: {
                fairfield: {
                    localSid: "CVGthr",
                    stationId: "KILN",
                    wfo: "ILN",
                    xCoor: 34,
                    yCoor: 50,
                    longitude: -84.5427,
                    latitude: 39.3314
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