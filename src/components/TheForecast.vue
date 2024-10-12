<template>
  <div class="forecast-heading">
    <h1>Seven Day Weather Forecast</h1>
    <h2>{{ getDate() }}</h2>
    <div class="current-city">
      <p v-if="this.heatIndex > 32">
        <!-- if value is null method converts it to F = 32 -->
        {{ this.city }}, {{ this.state }} | currently {{ this.temperature }}° F
        | heat index {{ this.heatIndex }}° F
      </p>
      <p v-else>
        {{ this.city }}, {{ this.state }} | currently {{ this.temperature }}° F
      </p>
    </div>
    <h4>
      Record High:
      {{ this.formattedRecordHigh }} -- {{ this.recordHigh[0] }}° F
    </h4>
    <h4>
      Record Low:
      {{ this.formattedRecordLow }} -- {{ this.recordLow[0] }}° F
    </h4>
  </div>
  <div class="cards-container">
    <div class="card" v-for="period in periods" :key="period.number">
      <img :src="period.icon" alt="weatherIcon" />
      <div class="text-container">
        <p>{{ period.name }}</p>
        <p>{{ period.detailedForecast }}</p>
        <p v-if="period.probabilityOfPrecipitation.value > 0">
          {{ period.probabilityOfPrecipitation.value }}% chance of rain
        </p>
        <p v-else>0% chance of rain</p>
      </div>
    </div>
  </div>
</template>

<script>
import weatherService from "../services/WeatherService.js";
import rccasicService from "@/services/RccasicService.js";
import { format } from "date-fns";

export default {
  data() {
    return {
      periods: [],
      city: "",
      state: "",
      temperature: null,
      heatIndex: null,
      getDate() {
        return weatherService.getDate();
      },
      getRecordStats() {
        return rccasicService.getRecordStats();
      },
      meta: [],
      name: "",
      recordHigh: "",
      formattedRecordHigh: "",
      formattedRecordLow: "",
      recordLow: "",
    };
  },
  computed: {
    currentCityData() {
      return this.$store.getters.currentCityData;
    },
  },
  methods: {
    getCity() {
      if (this.currentCityData) {
        weatherService
          .getCityName(
            this.currentCityData.latitude,
            this.currentCityData.longitude
          )
          .then((response) => {
            this.city =
              response.data.properties.relativeLocation.properties.city;
            this.state =
              response.data.properties.relativeLocation.properties.state;
          })
          .catch((error) => {
            console.log("error in getCity", error);
          });
      }
    },
    getSevenDayForecast() {
      if (this.currentCityData) {
        weatherService
          .getForecast(
            this.currentCityData.wfo,
            this.currentCityData.xCoor,
            this.currentCityData.yCoor
          )
          .then((response) => {
            this.periods = response.data.properties.periods;
          })
          .catch((error) => {
            console.log("error in getSevenDayForecast", error);
          });
      }
    },
    getCurrentTemperature() {
      if (this.currentCityData) {
        weatherService
          .getCurrentWeather(this.currentCityData.stationId)
          .then((response) => {
            this.temperature = (
              (response.data.properties.temperature.value * 9) / 5 +
              32
            ).toFixed(0);
            this.heatIndex = (
              (response.data.properties.heatIndex.value * 9) / 5 +
              32
            ).toFixed(0);
          })
          .catch((error) => {
            console.log("error in getCurrentTemperature", error);
          });
      }
    },
    getRecordHighForRegion() {
      if (this.currentCityData) {
        rccasicService
          .getRecordHigh(this.currentCityData.localSid)
          .then((response) => {
            this.today = this.getDayOfYear();
            const day = this.today;
            this.recordHigh = response.smry[0][day];
            this.formattedRecordHigh = format(
              new Date(this.recordHigh[1]),
              "EEEE, MMMM dd, yyyy"
            );
          })
          .catch((error) => {
            console.log("error connecting to rccasicService", error);
          });
      }
    },
    getRecordLowForRegion() {
      if (this.currentCityData) {
        rccasicService
          .getRecordLow(this.currentCityData.localSid)
          .then((response) => {
            this.today = this.getDayOfYear();
            const day = this.today;
            this.recordLow = response.smry[0][day];
            this.formattedRecordLow = format(
              new Date(this.recordLow[1]),
              "EEEE, MMMM dd, yyyy"
            );
          })
          .catch((error) => {
            console.log("error connecting to rccasicService", error);
          });
      }
    },
    getDayOfYear() {
      let date = new Date();
      // Create a Date object for January 1st of the current year
      const startOfYear = new Date(date.getFullYear(), 0, 1); // getFullYear(), <month #>, Day of the month
      // Calculate the difference in milliseconds between the two dates
      const diffInMillis = date - startOfYear;
      // Convert the difference from milliseconds to days
      const dayOfYear = Math.floor(diffInMillis / (1000 * 60 * 60 * 24)) + 1; // Adding 1 since Jan 1st is day 1
      return dayOfYear;
    },
  },
  created() {
    this.getCity();
    this.getSevenDayForecast();
    this.getCurrentTemperature();
    this.getRecordHighForRegion();
    this.getRecordLowForRegion();
  },
};
</script>

<style scoped>
.forecast-heading {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
}
.current-city {
  font-size: 24px;
  color: blue;
  font-weight: 900;
}
.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
}
.forecast-heading {
  padding-top: 80px;
  padding-left: 40px;
}

.text-container {
  flex: 1; /* Allow the text to take the remaining space */
}

.card {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}
.card img {
  width: 100%;
  height: auto;
}
h2 {
  padding-bottom: 10px;
}
@media (max-width: 700px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>