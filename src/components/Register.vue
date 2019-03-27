<template>
  <!-- <div>
        <h4>Register</h4>
        <form @submit.prevent="register">
            <label for="name">Name</label>
            <div>
                <input id="name" type="text" v-model="name" required autofocus>
            </div>
             
            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>
            
            <label for="password-confirm">Confirm Password</label>
            <div>
                <input id="password-confirm" type="password" v-model="password_confirmation" required>
            </div>

            <div>
                <button type="submit">Register</button>
            </div>
        </form>
  </div>-->
  <div>
  <h1>Register</h1>
  <form class="register" @submit.prevent="register">
    <v-container fill-height>
      <v-layout column wrap>
        <v-flex xs12 sm6>
          <v-text-field v-model="name" :rules="[rules.required]" label="Name" required autofocus outline></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            label="Password"
            type="password"
            required
            outline
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            v-model="password_confirmation"
            :rules="[rules.required, rules.similar]"
            label="Confirm Password"
            type="password"
            required
            outline
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn type="submit" color="success">Register</v-btn>
  </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      password_confirmation: "",
      rules: {
        required: value => !!value || 'Required.',
        similar: value => !!value || 'Password does not match!'
      }
    };
  },
  methods: {
    register: function() {
      let data = {
        name: this.name,
        password: this.password
      };
      if (this.password === this.password_confirmation) {
        this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
      } else {
          alert("Password does not match!")
      }
    }
  }
};
</script>
