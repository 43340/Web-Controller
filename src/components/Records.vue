<template>
    <div class="table-responsive">
        <table class="table-hover" v-if="data">
            <thead>
                <tr>
                    <th>Process ID</th>
                    <th>Name</th>
                    <th>Set Temperature</th>
                    <th>Cook Time</th>
                    <th>Read Interval</th>
                    <th>Time Started</th>
                    <th>User ID</th>
                </tr>    
            </thead>   
            <tbody>
                <tr v-for="item in data">
                    <td><a href="http://10.3.141.1:8023/data/$item.process_id">{{ item.process_id }}</a></td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.set_temp }}</td>
                    <td>{{ item.cook_time }}</td>
                    <td>{{ item.read_int }}</td>
                    <td>{{ item.time_stamp }}</td>
                    <td>{{ item.user_id }}</td>
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
            data: null
        }
    },
    created () {
        axios({url: 'http://10.3.141.1:8023/process', headers: {'x-access-token': localStorage.getItem('token')}, method: 'GET' }).then(response => {
            return response.data;
        }).then(jsonData => {
            this.data = jsonData;
        }).catch(function(error){
            console.log(error)
        })
    }
}
</script>

<style>
ul{
    list-style: none
}
li{
    display: inline
}
</style>
