<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Details</v-toolbar-title>
    </v-toolbar>

    <!-- <chartist ratio="ct-minor-seventh" type="Line" :data="chartData" :options="chartOptions"></chartist> -->

    <v-data-table :items="data" :headers="headers" class="elevation-1" hide-actions>
      <template slot="headers" slot-scope="props">
        <th v-for="column in headers">{{ column.text }}</th>
      </template>

      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.time_stamp }}</td>
        <td class="text-xs-center">{{ props.item.temp }} °C</td>
        <td class="text-xs-center">{{ props.item.temp1 }} °C</td>
        <td class="text-xs-center">{{ props.item.temp2 }} °C</td>
        <td class="text-xs-center">{{ props.item.temp3 }} °C</td>
        <td class="text-xs-center">{{ props.item.hum }} %</td>
        <td class="text-xs-center">{{ props.item.hum1 }} %</td>
        <td class="text-xs-center">{{ props.item.hum2 }} %</td>
        <td class="text-xs-center">{{ props.item.hum3 }} %</td>
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
        { text: "Temp.", sortable: false, value: "temp" },
        { text: "Temp. (Chamber 1)", sortable: false, value: "temp1" },
        { text: "Temp. (Chamber 2)", sortable: false, value: "temp2" },
        { text: "Temp. (Chamber 3)", sortable: false, value: "temp3" },
        { text: "Hum.", sortable: false, value: "hum" },
        { text: "Hum. (Chamber 1)", sortable: false, value: "hum1" },
        { text: "Hum. (Chamber 2)", sortable: false, value: "hum2" },
        { text: "Hum. (Chamber 3)", sortable: false, value: "hum3" }
      ],
      data: []
      /* chartData: {
        labels: [],
        series: []
      },
      chartOptions: {
        lineSmooth: false,
        fullWidth: true,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 10 == 0 ? value : null;
          }
        }
      } */
    };
  },
  created() {
    axios({
      url: "http://10.3.141.1:8023/data/" + this.$route.params.id,
      headers: { "x-access-token": localStorage.getItem("token") },
      method: "GET"
    })
      .then(response => {
        console.log(response.status);
        return response.data;
      })
      .then(jsonData => {
        this.data = jsonData;
        /* var t = [];
        var h = [];
        jsonData.forEach(element => {
          this.chartData.labels.push(element.time_stamp);
          t.push(element.temp);
          h.push(element.hum);
        });
        this.chartData.series.push(t, h); */
        // console.log(this.chartData.series)
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style lang="scss">
@import "chartist/dist/scss/chartist.scss";
</style>

