<template>
  <!-- <div>
        <h1>Current</h1>
        <div v-if="timeLeft === '0:00:00' || timeLeft === '-1 day, 23:59:59' || timeLeft === '' || stopped === 'true'">
            {{stopListening()}}
            <h2>No running process click the start new button to start a new process</h2>
            <v-btn 
                color="success"
                @click="startNew()"
            >Start New
            </v-btn>
        </div>
        <div v-else>
            <p>Temperature: {{ temp }}</p>
            <p>Humidity: {{ hum }}</p>
            <p>Time left: {{ timeLeft }}</p>
            <v-btn 
                color="error"
                @click="stopProcess()"
            >Stop</v-btn>
        </div>
  </div>-->
  <div
    v-if="timeLeft === '0:00:00' || timeLeft === '-1 day, 23:59:59' || timeLeft === '' || stopped === 'true'"
  >
    {{stopListening()}}
    <h2>No running process click the start new button to start a new process</h2>
    <v-btn color="success" @click="startNew()">Start New</v-btn>
  </div>
  <div v-else>
      <v-container fluid grid-list-lg>
        <v-layout row wrap fill-height>
          <v-flex xs12 sm4>
            <v-card class="mx-auto" color="#26c6da" dark max-width="300">
              <v-card-title>
                <v-icon large left>mdi-twitter</v-icon>
                <span class="title font-weight-light">Temperature</span>
              </v-card-title>

              <v-card-text class="display-3 font-weight-bold">{{ temp }} °C</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm4>
            <v-card class="mx-auto" color="#26da86" dark max-width="300">
              <v-card-title>
                <v-icon large left>mdi-twitter</v-icon>
                <span class="title font-weight-light">Humidity</span>
              </v-card-title>

              <v-card-text class="display-3 font-weight-bold">{{ hum }} %</v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm4>
            <v-card class="mx-auto" color="#da2636" dark max-width="300">
              <v-card-title>
                <v-icon large left>mdi-twitter</v-icon>
                <span class="title font-weight-light">ETA</span>
              </v-card-title>

              <v-card-text class="display-3 font-weight-bold">{{ timeLeft }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn 
                color="error"
                @click="stopProcess()"
            >Stop</v-btn>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";

export default {
  data() {
    return {
      temp: "",
      hum: "",
      timeLeft: "",
      socket: io("http://10.3.141.1:8023"),
      stopped: ""
    };
  },
  beforeDestroy() {
    stopListening
  },
  mounted() {
    this.socket.on("some event", data => {
      this.temp = data.temp;
      this.hum = data.hum;
      this.timeLeft = data.timeleft;
    });
  },
  methods: {
    stopProcess() {
      axios({
        url: "http://10.3.141.1:8023/stop",
        headers: { "x-access-token": localStorage.getItem("token") },
        method: "GET"
      })
        .then(resp => {
          console.log(resp.data);
          this.stopped = "true";
        })
        .catch(err => {
          reject(err);
        });
    },
    startNew() {
      this.$router.push("/new");
    },
    stopListening() {
      this.socket.removeAllListeners("some event");
    }
  }
};
</script>

<style scoped>
</style>
