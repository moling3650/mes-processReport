<template>
  <div class="pie" ref="pie" :style="{width, height}"></div>
</template>

<script>
  export default {
    name: 'Pie',
    props: {
      width: {
        type: [Number, String],
        default: '100%'
      },
      height: {
        type: [Number, String],
        default: '100%'
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
        myChart: null
      }
    },
    // watch: {
    //   'processCode': 'fetchData'
    // },
    methods: {
      init () {
        this.myChart = this.echarts.init(this.$refs['pie'])
        let option = {
          title: {
            text: '不良现象分布',
            left: 'center'
          },
          tooltip: {},
          legend: {
            orient: 'vertical',
            data: [],
            right: '10%',
            top: 'middle'
          },
          color: ['#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          // animation: false,
          series: [{
            name: '不良现象',
            type: 'pie',
            radius: [0, '65%'],
            center: ['40%', '55%'],
            data: [],
            label: {
              normal: {
                formatter: '{b}: {d}%',
                textStyle: {
                  color: '#333',
                  fontWeight: 'bold',
                  fontSize: 14
                }
              }
            }
          }]
        }
        this.myChart.setOption(option)
      },
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/processInOutNg.ashx?ActType=${this.api}&process_code=${this.processCode}`).then(res => {
          let dataList = res.data.Ng_codeList
          this.myChart.setOption({
            legend: {
              data: dataList.map(item => item.ng_name)
            },
            series: [{
              data: dataList.map(item => ({ name: item.ng_name, value: item.qty }))
            }]
          })
        })
      }
    },
    mounted () {
      console.log('pie mounted')
      this.init()
    },
    activated () {
      console.log('pie activated')
      this.processCode && this.fetchData()
    },
    deactivated () {
      this.myChart.setOption({
        legend: {
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
