<template>
 <form
    class="newProcess"
    @submit.prevent="newProcess"
  >
		<v-container fill-height>
      <v-layout column wrap>

        <v-flex xs12 sm6>
          <v-text-field
						v-model="name"
            :rules="[rules.required]"
						label="Name"
						required
						outline
    			></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
						v-model.number="stemp"
            :rules="[rules.required, rules.numbers]"
						label="Set Temperature"
            type="number"
						required
						outline
    			></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
						v-model.number="ctime"
            :rules="[rules.required, rules.numbers]"
						label="Time"
            type="number"
						required
						outline
    			></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
						v-model.number="rinte"
            :rules="[rules.required, rules.numbers]"
						label="Read Interval"
            type="number"
						required
						outline
    			></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>

    <v-btn
      type="submit"
      color="success"
    >
      Start
    </v-btn>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      stemp: '',
      ctime: '',
      rinte: '',
      rules: {
        required: value => !!value || 'Invalid input.',
        numbers: value => {
          const pattern = /^([+-]?[1-9]\d*|0)$/
          return pattern.test(value) || 'Invalid input. Numbers only'
        }
      }
    };
  },
  methods: {
    newProcess: function() {
      let data = {
        name: this.name,
        stemp: Number(this.stemp),
        ctime: Number(this.ctime),
        rinte: Number(this.rinte)
      };
      this.$store
        .dispatch("newProcess", data)
        .then(() => this.$router.push("/current"))
        .catch(err => console.log(err));
    }
  },
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>
