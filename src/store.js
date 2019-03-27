import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
		user : {},
		admin: localStorage.getItem('admin') || '',
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token, user, admin){
		    state.status = 'success'
		    state.token = token
			state.user = user
			state.admin = admin
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
		},
	},
	actions: {
	  	login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios.post("http://10.3.141.1:8023/login", {}, {
					auth: {
					username: user.username,
					password: user.password
					}
				}).then(resp => {
	                const token = resp.data.token
					const user = resp.data.user
					// const admin = resp.data.admin
					const admin = resp.data.admin ? 'admin' : ''
					console.log(resp.data)
					localStorage.setItem('token', token)
					localStorage.setItem('admin', admin)

	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, user, admin)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error')
					localStorage.removeItem('token')
					localStorage.removeItem('admin')
	                reject(err)
	            })
	        })
		},
	    register({commit}, parameter){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://10.3.141.1:8023/user', data: parameter, headers: {'x-access-token': localStorage.getItem('token')}, method: 'POST' })
	            .then(resp => {
	                console.log(resp.data)
	                resolve(resp)
	            })
	            .catch(err => {
	                reject(err)
	            })
	        })
	    },
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
				localStorage.removeItem('token')
				localStorage.removeItem('admin')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
		},
		newProcess({commit}, parameter){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://10.3.141.1:8023/process', data: parameter, headers: {'x-access-token': localStorage.getItem('token')}, method: 'POST' })
	            .then(resp => {
	                console.log(resp.data)
	                resolve(resp)
	            })
	            .catch(err => {
	                reject(err)
	            })
	        })
		},
	},
	getters : {
	  isLoggedIn: state => !!state.token,
	  isAdmin: state => !!state.admin,
	  authStatus: state => state.status,
	}
})
