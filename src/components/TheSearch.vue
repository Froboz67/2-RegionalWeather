<template>
  <div>
    <h1>Search Forecast Page</h1>
    <label for="address">search an address</label>
    <input type="text" v-model="address" />
    <button @click="getCoordinates">search</button>
  </div>
</template>

<script>
import LocationService from "@/services/LocationService";
import WeatherService from "@/services/WeatherService";

export default {
  data() {
    return {
      address: "",
      latitude: "",
      longitude: "",
    };
  },
  methods: {
    getCoordinates() {
      LocationService.getCoordinates(this.address).then((response) => {
        this.coordinate = response.data;
        console.log("good luck ", this.coordinate);
        this.latitude = response.data[0].lat;
        this.longitude = response.data[0].lon;
        console.log(
          "latitude: ",
          this.latitude,
          " longitude: ",
          this.longitude
        );
        WeatherService.getCityName(this.latitude, this.longitude)
          .then((response) => {
            this.cityProperties = response.data;
            console.log("city properties: ", this.cityProperties);
            this.cityName =
              response.data.properties.relativeLocation.properties.city;
            console.log("cityName: ", this.cityName);
            this.wfo = response.data.properties.gridId;
            console.log("wfo: ", response.data.properties.gridId);
            this.xCoor = response.data.properties.gridX;
            console.log("xCoor: ", response.data.properties.gridX);
            this.yCoor = response.data.properties.gridY;
            console.log("yCoor: ", response.data.properties.gridY);

            return WeatherService.getStationId(
              this.wfo,
              this.xCoor,
              this.yCoor
            );
          })
          .then((response) => {
            this.stationId = response.data;
            console.log("stationIdArray: ", this.stationId);
            this.stationId =
              response.data.features[0].properties.stationIdentifier;
            console.log("stationId: ", this.stationId);
            this.localSid = this.wfo;
            const cityData = {
              localSid: this.localSid,
              stationId: this.stationId,
              wfo: this.wfo,
              xCoor: this.xCoor,
              yCoor: this.yCoor,
              longitude: this.longitude,
              latitude: this.latitude,
            };
            console.log("cityData: ", cityData, this.cityName);
            this.$store.commit("setUpdateCityData", {
              cityData,
            });
            this.$store.commit("setCurrentCity", this.cityName.toLowerCase());
            this.$router.push({ name: "forecast" });
          })
          .catch((error) => {
            console.log("an error occured ", error);
          });
      });
    },
  },
};
</script>

<style scoped>
</style>