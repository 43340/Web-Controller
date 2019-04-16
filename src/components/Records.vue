<template>
  <!-- <div>
        <h1>Records</h1>
        <div class="table-responsive">
            <table class="table-hover" v-if="data">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Set Temperature</th>
                        <th>Cook Time</th>
                        <th>Read Interval</th>
                        <th>Time Started</th>
                        <th>Action</th>
                    </tr>    
                </thead>   
                <tbody>
                    <tr v-for="item, i in data">
                        <td class="pname"><router-link :to="{ name: 'detail', params: { id: item.process_id } }">{{ item.name }}</router-link></td>
                        <td class="stemp">{{ item.set_temp }}</td>
                        <td class="ctime">{{ item.cook_time }}</td>
                        <td class="rinte">{{ item.read_int }}</td>
                        <td class="stime">{{ item.time_stamp }}</td>
                        <td class="delete">
                            <button v-on:click="deleteEntry(item.process_id, i)">x</button>
                        </td>
                    </tr>
                </tbody>
            </table>    
        </div>    
  </div>-->
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Records</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }"></template>
        <v-card>
          <v-card-title>
            <span class="headline">Enter Final Weight</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model.number="finalW"
                    label="Final Weight (grams)"
                    :rules="[rules.numbers]"
                    type="number"
                    required
                    outline
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveWeight()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :items="data"
      :headers="headers"
      :search="search"
      class="elevation-1"
      hide-actions
    >
      <template slot="headers" slot-scope="props">
        <th v-for="column in headers">{{ column.text }}</th>
      </template>

      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.set_temp }}</td>
        <td class="text-xs-right">{{ props.item.initial_w }}</td>
        <td class="text-xs-right">{{ props.item.final_w }}</td>
        <td
          class="text-xs-right"
        >{{ new Date(props.item.cook_time * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0] }}</td>
        <td class="text-xs-right">{{ props.item.read_int }}</td>
        <td>{{ props.item.time_stamp }}</td>
        <td class="actions">
          <v-icon @click="openDetails(props.item.process_id)">zoom_in</v-icon>
          <v-icon @click="openDialog(props.item)">cloud_download</v-icon>
          <v-icon @click="deleteEntry(props.item, props.item.process_id)">delete</v-icon>
        </td>
      </template>
      <v-alert
        v-slot:no-results
        :value="true"
        color="error"
        icon="warning"
      >Your search for "{{ search }}" found no results.</v-alert>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      finalW: "",
      pid: "",
      rules: {
        required: value => !!value || "Required.",
        numbers: value => {
          const pattern = /^([+-]?[1-9]\d*|0)$/;
          return pattern.test(value) || "Required. Numbers only";
        }
      },
      dialog: false,
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Set Temperature", sortable: false, value: "set_temp" },
        { text: "Initial Weight", sortable: false, value: "initial_w" },
        { text: "Final Weight", sortable: false, value: "final_w" },
        { text: "Set Time (HH:mm:ss)", sortable: false, value: "cook_time" },
        { text: "Read Interval", sortable: false, value: "read_int" },
        { text: "Time", value: "time_stamp" },
        { text: "Actions", value: "name", sortable: false }
      ],
      data: []
    };
  },
  created() {
    axios({
      url: "http://10.3.141.1:8023/process",
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
  },
  methods: {
    openDialog(item) {
      this.dialog = true;
      this.pid = item.process_id;
    },
    saveWeight() {
      console.log("woot");
      axios({
        url: "http://10.3.141.1:8023/process/" + this.pid + "/" + this.finalW,
        headers: { "x-access-token": localStorage.getItem("token") },
        method: "PUT"
      })
        .then(response => {
          console.log(response.status);
          if (response.status === 200) {
            window.location.href = `http://10.3.141.1:8023/process/report/${
              this.pid
            }`;
            this.pid = "";
            this.finalW = "0";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      this.dialog = false;
    },
    deleteEntry(item, id) {
      if (confirm("Are you sure you want to delete this item?")) {
        axios({
          url: "http://10.3.141.1:8023/process/" + id,
          headers: { "x-access-token": localStorage.getItem("token") },
          method: "DELETE"
        })
          .then(() => {
            const index = this.data.indexOf(item);
            console.log(index);
            this.data.splice(index, 1);
            console.log("Deleted");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        return;
      }
    },
    openDetails(pid) {
      this.$router.push(`/detail/${pid}`);
    }
  }
};
</script>
