<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Records</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
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
        <td
          class="text-xs-right"
        >{{ new Date(props.item.cook_time * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0] }}</td>
        <td class="text-xs-right">{{ props.item.read_int }}</td>
        <td>{{ props.item.time_stamp }}</td>
        <td class="actions">
          <v-icon @click="openDetails(props.item.process_id)">zoom_in</v-icon>
          <a :href="`http://10.3.141.1:8023/download/report/${props.item.process_id}`">
            <v-icon>cloud_download</v-icon>
          </a>
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
