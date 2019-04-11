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
        <td
          class="text-xs-left"
          @click="openDetails(props.item.public_id)"
        >{{ props.item.public_id }}</td>
        <td class="text-xs-right" @click="openDetails(props.item.name)">{{ props.item.name }}</td>
        <td class="text-xs-right" @click="openDetails(props.item.admin)">{{ props.item.admin }}</td>
        <td class="delete">
          <v-icon
            small
            @click="deleteEntry(props.item, props.item.public_id, props.item.name)"
          >delete</v-icon>
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
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Name", align: "left", sortable: false, value: "set_temp" },
        { text: "Admin", sortable: false, value: "cook_time" },
        { text: "Actions", value: "name", sortable: false }
      ],
      data: []
    };
  },
  created() {
    axios({
      url: "http://10.3.141.1:8023/user",
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
    deleteEntry(item, id, name) {
      var r = confirm(
        "Are you sure you want to delete this user: " + name + "?"
      );
      console.log(r);
      if (r === true) {
        axios({
          url: "http://10.3.141.1:8023/user/" + id,
          headers: { "x-access-token": localStorage.getItem("token") },
          method: "DELETE"
        })
          .then(() => {
            const index = this.data.indexOf(item);
            this.data.splice(index, 1);
            console.log(index);
            console.log("Deleted");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log("NO");
      }
    },
    openDetails(pid) {
      this.$router.push(`/detail/${pid}`);
    }
  }
};
</script>
