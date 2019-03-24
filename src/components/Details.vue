<template>
    <div class="table-responsive">
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
        axios({url: 'http://10.3.141.1:8023/data/' + this.$route.params.id, headers: {'x-access-token': localStorage.getItem('token')}, method: 'GET' }).then(response => {
            return response.data;
        }).then(jsonData => {
            this.data = jsonData;
        }).catch(function(error){
            console.log(error)
        })
    },
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
