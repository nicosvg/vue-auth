<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="'Welcome ' + user.given_name" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  beforeCreate() {
    console.log("before create");
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>
