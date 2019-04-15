<template>
  <form class="newProcess" @submit.prevent="newProcess">
    <v-container fill-height>
      <v-layout column wrap>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            label="Name"
            required
            autofocus
            outline
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            v-model.number="stemp"
            :rules="[rules.numbers]"
            label="Set Temperature"
            type="number"
            required
            outline
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            v-model.number="initw"
            :rules="[rules.numbers]"
            label="Initial Weight (grams)"
            type="number"
            required
            outline
          ></v-text-field>
        </v-flex>

        <v-layout row wrap justify-space-between>
          <v-flex xs12 sm3>
            <v-text-field
              v-model.number="ctimeh"
              :rules="[rules.numbers]"
              label="Time (H)"
              type="number"
              required
              outline
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <v-text-field
              v-model.number="ctimem"
              :rules="[rules.numbers]"
              label="Time (M)"
              type="number"
              required
              outline
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm3>
            <v-text-field
              v-model.number="ctimes"
              :rules="[rules.numbers]"
              label="Time (S)"
              type="number"
              required
              outline
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-flex xs12 sm6>
          <v-text-field
            v-model.number="rinte"
            :rules="[rules.numbers]"
            label="Read Interval (seconds)"
            type="number"
            required
            outline
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn type="submit" color="success">Start</v-btn>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      stemp: "",
      initw: "",
      ctime: "",
      ctimeh: "",
      ctimem: "",
      ctimes: "",
      rinte: "",
      rules: {
        required: value => !!value || "Required.",
        numbers: value => {
          const pattern = /^([+-]?[1-9]\d*|0)$/;
          return pattern.test(value) || "Required. Numbers only";
        }
      },
      dialog: false
    };
  },
  methods: {
    newProcess: function() {
      let data = {
        name: this.name,
        stemp: Number(this.stemp),
        initw: Number(this.initw),
        ctime:
          Number(this.ctimeh) * 60 * 60 +
          Number(this.ctimem) * 60 +
          Number(this.ctimes),
        rinte: Number(this.rinte)
      };
      this.$store
        .dispatch("newProcess", data)
        .then(() => this.$router.push("/current"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
