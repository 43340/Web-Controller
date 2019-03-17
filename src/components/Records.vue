<template>
    <div class="container">
        <table class="table table-bordered">
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
            <tr v-for="process in processes">
                <td v-for="proc in process"> {{ proc }} </td>
            </tr>
        </table>    
    </div>    
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            processes: ''
        }
    },
    created () {
        axios({url: 'http://10.3.141.1:8023/process', headers: {'x-access-token': localStorage.getItem('token')}, method: 'GET' }).then(response => {
            this.processes = response.data
            console.log(this.processes)
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
