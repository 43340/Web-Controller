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

    <chartist
        ratio="ct-minor-seventh"
        type="Line"
        :data="chartData"
        :options="chartOptions" >
    </chartist>

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
      data: [],
      chartData: {
            labels: [],
            series: [],
        },
        chartOptions: {
            lineSmooth: false,
            fullWidth: true,
            axisX: {
              labelInterpolationFnc: function (value, index) {        
     
              return index % 10 == 0 ? value: null;
      }

            }
        }
    };
  },
  created() {
    axios({
      url: "http://10.3.141.1:8023/data/" + this.$route.params.id,
      headers: { "x-access-token": localStorage.getItem("token") },
      method: "GET"
    })
      .then(response => {
        console.log(response.status)
        return response.data;
      })
      .then(jsonData => {
        this.data = jsonData;
        var t = []
        var h = []
        jsonData.forEach(element => {
          this.chartData.labels.push(element.time_stamp)
          t.push(element.temp)
          h.push(element.hum)
        });
        this.chartData.series.push(t, h)
        // console.log(this.chartData.series)
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
  @import "chartist/dist/scss/chartist.scss";
</style>

