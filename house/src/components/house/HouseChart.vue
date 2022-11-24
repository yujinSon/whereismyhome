<template>
  <div>
    <canvas id="chart" width="100%" height="30%"></canvas>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Chart, BarElement, BarController, LinearScale, CategoryScale } from "chart.js";
Chart.register(BarElement, BarController, LinearScale, CategoryScale);

const houseStore = "houseStore";

export default {
  data() {
    return {
      myChart: null,
      lab: null,
      dt: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },
  methods: {
    fillData() {
      const ctx = document.getElementById("chart").getContext("2d");
      // const ctx = document.getElementById(`chart-${this.pIndex}`).getContext("2d");
      if (this.myChart != null) {
        this.myChart.destroy();
      }

      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.lab,
          datasets: [
            {
              label: "# of Votes",
              data: this.dt,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        // options: {
        //   scales: {
        //     y: {
        //       beginAtZero: true,
        //     },
        //   },
        // },
      });
    },
  },

  watch: {
    houses: function () {
      var temp_labels = [];
      var temp_prices = [];
      for (var i = 0; i < this.houses.length; i++) {
        temp_labels.push(this.houses[i]["아파트"] + " " + this.houses[i]["층"] + "층");
        temp_prices.push(Number(this.houses[i]["거래금액"].replace(",", "")));
      }
      this.lab = temp_labels;
      this.dt = temp_prices;

      this.fillData();
    },
  },
};
</script>
<style lang=""></style>
