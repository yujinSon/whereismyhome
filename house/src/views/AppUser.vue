<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3> Member Service</h3>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "AppUser",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Do+Hyeon&display=swap');
h3{
    font-family: 'Black Han Sans', sans-serif;
  font-family: 'Do Hyeon', sans-serif;
}

b-container{
    background-image: url("../assets/apt4.png");
  background-size: cover;
  position: fixed;
}
</style>
