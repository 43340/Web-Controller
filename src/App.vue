<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/new">New</router-link></li>
        <li><router-link to="/records">Records</router-link></li>
        <li><router-link to="/current">Current</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><span v-if="isLoggedIn">
          <a @click="logout">Logout</a>
        </span></li>
        <li><span v-if="!isLoggedIn"> 
          <router-link to="/login">Login</router-link>
        </span></li>
      </ul>
    </div>
    <div id="body">
      <router-view/>
    </div>
    <footer>
      Made with <span class="heart">❤</span> by heeho
    </footer>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin: function() {
      console.log(localStorage.getItem('admin'))
      return localStorage.getItem('admin');
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0.25rem;
  background-color: #42b983;
  top: 0;
  left: 0;
  right: 0;
  height: 80dp;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
  text-decoration: underline;
}

#nav a:hover {
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: white;
}

#nav a {
  text-decoration: none;
}

#body {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.heart {
  color:#e25555;
}
</style>
