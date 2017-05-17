<template>
  <div class="x-bar" ref="x-bar" :style="{width, height}"></div>
</template>

<script>
  export default {
    name: 'XBar',
    props: {
      width: {
        type: [Number, String],
        default: '100%'
      },
      height: {
        type: [Number, String],
        default: '100%'
      },
      title: {
        type: String,
        default: '标题'
      },
      api: {
        type: String,
        required: true
      },
      processCode: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        myChart: null,
        colors: ['#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
      }
    },
    watch: {
      'processCode': 'fetchData'
    },
    methods: {
      init () {
        this.myChart = this.echarts.init(this.$refs['x-bar'])
        let option = {
          title: {
            text: this.title,
            left: 'center'
          },
          tooltip: {},
          grid: {
            top: 50,
            right: 80,
            bottom: 10,
            left: 10,
            containLabel: true
          },
          xAxis: {
            data: []
          },
          yAxis: {
          },
          color: ['#418ebd'],
          // animation: false,
          series: [{
            name: '数量',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 16
                }
              }
            }
          }]
        }
        this.myChart.setOption(option)
      },
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/processInOutNg.ashx?ActType=${this.api}&process_code=${this.processCode}`).then(res => {
          var dataList = res.data.Ng_codeList
          this.myChart.setOption({
            xAxis: {
              data: dataList.map(item => item.ng_name)
            },
            series: [{
              data: dataList.map((item, idx) => {
                return {
                  value: item.qty,
                  itemStyle: {
                    normal: {
                      color: this.colors[idx % this.colors.length]
                    }
                  }
                }
              })
            }]
          })
        })
      }
    },
    mounted () {
      this.init()
    },
    activated () {
      this.processCode && this.fetchData()
    },
    deactivated () {
      this.myChart.setOption({
        xAxis: {
          data: []
        },
        series: [{
          data: []
        }]
      })
    }
  }
</script>

<style lang="css" scoped>
</style>
