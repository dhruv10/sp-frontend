<template>
  <div class="chart-canvas">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'Chart',
  props: {
    chartType: {
      type: String,
      required: true,
    },
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.chart = new Chart(this.$refs.chart.getContext('2d'), {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions,
    });
  },
  watch: {
    chartData() {
      this.chart.data = this.chartData;
      this.chart.options = this.chartOptions;
      this.chart.update();
    },
  },
};
</script>

<style scoped>
  .chart-canvas {
    margin: 1rem 0;
    width: 90%;
  }
</style>
