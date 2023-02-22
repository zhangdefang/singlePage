<template>
  <div v-bind:id="id" v-bind:data="data"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'baseEchartsAllComponent',
  data() {
    return {
      ChartLineGraph: null
    }
  },
  watch: {
    data: {
      handler(newvalue, oldvalue) {
        this.drawLineGraph(this.id, newvalue)
      },
      deep: true
    }
  },
  props: ['id', 'data'],
  mounted() {
    this.drawLineGraph(this.id, this.data)
  },
  created() {},
  methods: {
    drawLineGraph(id, data) {
      let _this = this
      if (!this.ChartLineGraph) {
        let myChart = document.getElementById(id)
        this.ChartLineGraph = echarts.init(myChart)
      }
      this.ChartLineGraph.setOption(data, true)
      window.addEventListener('resize', function() {
        _this.ChartLineGraph.resize()
      })
    },
    resize() {
      this.ChartLineGraph.resize()
    }
  },
  beforeDestroy() {
    if (this.ChartLineGraph) {
      this.ChartLineGraph.clear()
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
