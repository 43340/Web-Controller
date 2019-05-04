<template>
  <div
    v-if="timeLeft === '0:00:00' || timeLeft === '-1 day, 23:59:58' || timeLeft === '' || stopped === 'true' || stop === true"
  >
    <h2>No running process.</h2>
    <v-btn color="success" @click="startNew()">Start New</v-btn>
    <v-btn color="success" @click="redo()">Redo Last Process</v-btn>
  </div>
  <div v-else>
    <v-container fluid grid-list-lg>
      <v-layout row wrap fill-height>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Confirm</v-card-title>

            <v-card-text>Do you want to stop the current process?</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="stopProcess()">Confirm</v-btn>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-flex xs12 sm3>
          <v-card class="mx-auto" color="#26c6da" dark max-width="300">
            <v-card-title>
              <v-icon large left>mdi-twitter</v-icon>
              <span class="title font-weight-light">Average Temperature</span>
            </v-card-title>

            <v-card-text class="display-3 font-weight-bold">{{ temp }} °C</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm3>
          <v-card class="mx-auto" color="#26c6da" dark max-width="300">
            <v-card-title>
              <v-icon large left>mdi-twitter</v-icon>
              <span class="title font-weight-light">Temperature (Sensor 1)</span>
            </v-card-title>

            <v-card-text class="display-3 font-weight-bold">{{ temp1 }} °C</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm3>
          <v-card class="mx-auto" color="#26c6da" dark max-width="300">
            <v-card-title>
              <v-icon large left>mdi-twitter</v-icon>
              <span class="title font-weight-light">Temperature (Sensor 2)</span>
            </v-card-title>

            <v-card-text class="display-3 font-weight-bold">{{ temp2 }} °C</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm3>
          <v-card class="mx-auto" color="#26c6da" dark max-width="300">
            <v-card-title>
              <v-icon large left>mdi-twitter</v-icon>
              <span class="title font-weight-light">Temperature (Sensor 3)</span>
            </v-card-title>

            <v-card-text class="display-3 font-weight-bold">{{ temp3 }} °C</v-card-text>
          </v-card>
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex xs12 sm3>
          <v-card class="mx-auto" color="#26da86" dark max-width="300">
            <v-card-title>
              <v-icon large left>mdi-twitter</v-icon>
              <span class="title font-weight-light">Average Humidity</span>
            </v-card-title>

            <v-card-text class="display-3 font-weight-bold">{{ hum }} %</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm3>
          <v-card class="mx-auto" color="#26da86" dark max-width="300">
            <v-card-title>
              <v-icon large left>mdi-twitter</v-icon>
              <span class="title font-weight-light">Humidity (Sensor 1)</span>
            </v-card-title>

            <v-card-text class="display-3 font-weight-bold">{{ hum1 }} %</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm3>
          <v-card class="mx-auto" color="#26da86" dark max-width="300">
            <v-card-title>
              <v-icon large left>mdi-twitter</v-icon>
              <span class="title font-weight-light">Humidity (Sensor 2)</span>
            </v-card-title>

            <v-card-text class="display-3 font-weight-bold">{{ hum2 }} %</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm3>
          <v-card class="mx-auto" color="#26da86" dark max-width="300">
            <v-card-title>
              <v-icon large left>mdi-twitter</v-icon>
              <span class="title font-weight-light">Humidity (Sensor 3)</span>
            </v-card-title>

            <v-card-text class="display-3 font-weight-bold">{{ hum3 }} %</v-card-text>
          </v-card>
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex xs12>
          <v-card class="mx-auto" color="#da2636" dark max-width="300">
            <v-card-title>
              <v-icon large left>mdi-twitter</v-icon>
              <span class="title font-weight-light">Remaining Time</span>
            </v-card-title>

            <v-card-text class="display-3 font-weight-bold">{{ timeLeft }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn color="error" @click="dialog = true">Stop</v-btn>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";

export default {
  data() {
    return {
      temp: "",
      temp1: "",
      temp2: "",
      temp3: "",
      hum: "",
      hum1: "",
      hum2: "",
      hum3: "",
      timeLeft: "",
      stop: true,
      socket: io("http://10.3.141.1:8023"),
      stopped: "",
      dialog: false
    };
  },
  mounted() {
    this.socket.on("some event", data => {
      this.temp = data.temp;
      this.temp1 = data.temp1;
      this.temp2 = data.temp2;
      this.temp3 = data.temp3;
      this.hum = data.hum;
      this.hum1 = data.hum1;
      this.hum2 = data.hum2;
      this.hum3 = data.hum3;
      this.timeLeft = data.timeleft;
      this.stop = data.stop_run;
    });
  },
  methods: {
    stopProcess() {
      this.dialog = false;
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
    redo() {
      this.dialog = false;
      axios({
        url: "http://10.3.141.1:8023/process/reset",
        headers: { "x-access-token": localStorage.getItem("token") },
        method: "GET"
      })
        .then(resp => {
          console.log(resp.data);
          this.stopped = "true";
        })
        .then(() => this.$router.go("/"))
        .catch(err => {
          reject(err);
        });
    },
    startNew() {
      this.$router.push("/new");
    }
  }
};
</script>

<style scoped>
</style>
