<template>
  <v-form ref="form" lazy-validation>
    <v-container fill-height>
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="username"
            label="Username"
            :rules="[rules.required]"
            required
            outline
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            @keyup.native.enter="login"
            v-model="password"
            type="password"
            label="Password"
            :rules="[rules.required]"
            required
            outline
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn color="success" @click="login" @keyup.native.enter="login">Login</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    login: function() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.go("/"))
        .catch(err => alert("Invalid username or password"));
    }
  }
};
</script>