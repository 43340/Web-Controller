<template>
  <!-- <div id="app">
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
  </div>-->
  <v-app>
    <v-navigation-drawer app v-model="drawer" stateless value="true">
      <v-list>
        <v-list-tile @click="goToRoute('/')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="goToRoute('/new')">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>New Process</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="goToRoute('/current')">
          <v-list-tile-action>
            <v-icon>timer</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Current</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="goToRoute('/records')">
          <v-list-tile-action>
            <v-icon>folder</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Records</v-list-tile-title>
        </v-list-tile>

        <v-list-group v-if="isLoggedIn && isAdmin" prepend-icon="account_circle" value="false">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Admin</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile @click="goToRoute('/register')">
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-title>Add User</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="goToRoute('/users')">
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-title>View Users</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="goToRoute('/allrecords')">
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-title>View Records</v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <!-- 
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    -->

    <v-toolbar app color="#42b983" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title>Tray Dryer Controller</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="!isLoggedIn" flat @click="goToRoute('/login')">
          <span>
            <router-link to="/login">Login</router-link>
          </span>
        </v-btn>
        <v-btn v-if="isLoggedIn" flat @click="logout">
          <span>
            <a>Logout</a>
          </span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin: function() {
      console.log(this.$store.getters.isAdmin);
      return this.$store.getters.isAdmin;
    }
  },
  data() {
    return {
      drawer: null
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    goToRoute(r) {
      this.$router.push(r);
    }
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
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

span a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
  text-decoration: none;
}

a.router-link-exact-active {
  color: white;
}

a {
  text-decoration: none;
}

#body {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.heart {
  color: #e25555;
}
</style>
