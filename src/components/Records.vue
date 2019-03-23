<template>
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
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            data: []
        }
    },
    mounted () {
        axios({url: 'http://10.3.141.1:8023/process', headers: {'x-access-token': localStorage.getItem('token')}, method: 'GET' }).then(response => {
            return response.data;
        }).then(jsonData => {
            this.data = jsonData;
        }).catch(function(error){
            console.log(error)
        })
    },
    methods: {
        deleteEntry(id, i) {
            axios({url: 'http://10.3.141.1:8023/process/' + id, headers: {'x-access-token': localStorage.getItem('token')}, method: 'DELETE' }).then(() => {
                console.log("Deleted")
                this.data.splice(i, 1);
            }).catch(function(error){
                console.log(error)
            })
        }
    }
}
</script>

<style>
ul{
    list-style: none;
}

li{
    display: inline;
}

table{
    border-collapse: collapse;
}

table, th, td{
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #2c3e50;
}

th, td{
    padding-left : 15px;
    padding-right : 15px;
    padding-bottom: 2px;
}

td.pname{
    text-align: left;
}

td.stemp, td.ctime, td.rinte, td.stime{
    text-align: center;
}
</style>
