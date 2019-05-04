<template>
  <div class="home">
    <img src="../assets/mmsu-logo.png" height="175" width="175">
    <img src="../assets/coe-logo.png" height="175" width="175">

    <br>
    <br>
    <h1>Tray Dryer Controller</h1>
    <br>
    <br>

    <h2>
      Press the menu icon on the top left corner
      <br>show available options.
    </h2>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
