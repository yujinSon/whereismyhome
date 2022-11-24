<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3> House Service</h3>
    <b-row>
      <b-col>
        <ka-kao-map></ka-kao-map>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <house-search-bar></house-search-bar>
      </b-col>
    </b-row>
    <house-chart ></house-chart>
  </b-container>
</template>
<script>

import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import KaKaoMap from "@/components/house/KaKaoMap.vue";
import HouseChart from "@/components/house/HouseChart.vue";


export default {
  name: "AppHouse",
  components: {
    HouseSearchBar,
    KaKaoMap,
    HouseChart,
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Do+Hyeon&display=swap');
h3{
    font-family: 'Black Han Sans', sans-serif;
  font-family: 'Do Hyeon', sans-serif;
}
</style>
