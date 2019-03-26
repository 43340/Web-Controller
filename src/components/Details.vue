<template>
  <!-- <div class="table-responsive">
        <table class="table-hover" v-if="data">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                </tr>    
            </thead>   
            <tbody>
                <tr v-for="item, i in data">
                    <td class="stemp">{{ item.time_stamp }}</td>
                    <td class="ctime">{{ item.temp }}</td>
                    <td class="rinte">{{ item.hum }}</td>
                </tr>
            </tbody>
        </table>    
  </div>-->
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Details</v-toolbar-title>
    </v-toolbar>

    <v-data-table
      :items="data"
      :headers="headers"
      class="elevation-1"
      hide-actions
    >
      <template slot="headers" slot-scope="props">
        <th v-for="column in headers">{{ column.text }}</th>
      </template>

      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.time_stamp }}</td>
        <td class="text-xs-center">{{ props.item.temp }}</td>
        <td class="text-xs-center">{{ props.item.hum }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "Time",
          value: "name"
        },
        { text: "Temperature", sortable: false, value: "temp" },
        { text: "Humidity", sortable: false, value: "hum" },
      ],
      data: []
    };
  },
  created() {
    axios({
      url: "http://10.3.141.1:8023/data/" + this.$route.params.id,
      headers: { "x-access-token": localStorage.getItem("token") },
      method: "GET"
    })
      .then(response => {
        return response.data;
      })
      .then(jsonData => {
        this.data = jsonData;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
