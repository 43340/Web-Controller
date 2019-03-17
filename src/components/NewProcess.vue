<template>
  <div>
    <form class="newProcess" @submit.prevent="newProcess">
      <h1>New Process</h1>
      <label>Name</label>
      <input required v-model="name" type="text" placeholder="Name">
      <label>Set Temperature</label>
      <input required v-model.number="stemp" type="number" placeholder="Set Temperature">
      <label>Cook Time</label>
      <input required v-model.number="ctime" type="number" placeholder="Cook Time">
      <label>Read Interval</label>
      <input required v-model.number="rinte" type="number" placeholder="Read Interval">
      <hr>
      <button type="submit">Start</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.name,
      stemp: this.stemp,
      ctime: this.ctime,
      rinte: this.rinte
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
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>
