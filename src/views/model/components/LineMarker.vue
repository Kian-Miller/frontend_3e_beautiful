<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    props: {
      lineData: {
        type: Array,
        default: () => {
          return []
        },
      },
      className: {
        type: String,
        default: 'chart',
      },
      id: {
        type: String,
        default: 'chart',
      },
      width: {
        type: String,
        default: '200px',
      },
      height: {
        type: String,
        default: '200px',
      },
    },
    data() {
      return {
        chart: null,
      }
    },
    watch: {
      lineData: {
        handler(newVal) {
          this.chart.resize()
          var data = []
          for (var i = 0; i < newVal.length; i++) {
            data.push([i, newVal[i]])
          }
          console.log('lineData Change', data)
          this.chart.setOption({
            series: [
              {
                data: data,
              },
            ],
          })
        },
        deep: true,
      },
    },
    mounted() {
      console.log('图形被挂载了')
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))

        this.chart.setOption({
          backgroundColor: '#394056',
          title: {
            top: 20,
            text: 'Requests',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#F1F1F3',
            },
            left: '1%',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B',
              },
            },
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none',
              },
              restore: {},
              saveAsImage: {},
            },
          },
          legend: {
            top: 20,
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['PAT'],
            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#F1F1F3',
            },
          },
          grid: {
            top: 100,
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#57617B',
                },
              },
              // data: [
              //   "13:00",
              //   "13:05",
              //   "13:10",
              //   "13:15",
              //   "13:20",
              //   "13:25",
              //   "13:30",
              //   "13:35",
              //   "13:40",
              //   "13:45",
              //   "13:50",
              //   "13:55",
              // ],
            },
          ],
          yAxis: [
            {
              type: 'value',
              // name: "(%)",
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: '#57617B',
                },
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 14,
                },
              },
              splitLine: {
                lineStyle: {
                  color: '#57617B',
                },
              },
            },
          ],
          dataZoom: [
            {
              type: 'inside',
              // start: 0,
              // end: 20,
            },
            {
              // start: 0,
              // end: 20,
            },
          ],
          series: [
            {
              name: 'PAT',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1,
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)',
                      },
                      {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)',
                      },
                    ],
                    false
                  ),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10,
                },
              },
              itemStyle: {
                normal: {
                  color: 'rgb(137,189,27)',
                  borderColor: 'rgba(137,189,2,0.27)',
                  borderWidth: 12,
                },
              },
              data: [
                220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122,
              ],
            },
          ],
        })
      },
    },
  }
</script>
