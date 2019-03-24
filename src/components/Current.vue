<template>
    <div>
        <h1>Current</h1>
        <div v-if="timeLeft === '0:00:00' || timeLeft === '' || stopped === 'true'">
            <button v-on:click="startNew()">Start New</button>
        </div>
        <div v-else>
            <p>Temperature: {{ temp }}</p>
            <p>Humidity: {{ hum }}</p>
            <p>Time left: {{ timeLeft }}</p>
            <button v-on:click="stopProcess()">Stop</button>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'

export default {
    data() {
        return {
            temp: '',
            hum: '',
            timeLeft: '',
            socket: io('http://10.3.141.1:8023'),
            stopped: '',
        }
    },
    mounted() {
        this.socket.on('some event', (data) => {
            this.temp = data.temp
            this.hum = data.hum
            this.timeLeft = data.timeleft
        });
    },
    methods: {
        stopProcess() {
            axios({url: 'http://10.3.141.1:8023/stop', headers: {'x-access-token': localStorage.getItem('token')}, method: 'GET' })
            .then(resp => {
                console.log(resp.data)
                this.stopped = 'true'
            })
            .catch(err => {
                reject(err)
            })
        },
        startNew() {
            this.$router.push('/new')
        }
    }
}
</script>

<style scoped>

</style>
