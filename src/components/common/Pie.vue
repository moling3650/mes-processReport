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
    // 监视数据变化
    watch: {
      'processCode': 'fetchData'
    },
    // 自定义的方法
    methods: {
      // 初始化echarts的设置
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
      // 从接口调动数据，并更新图表
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
    // 钩子函数，当组件首次挂载到页面时调用
    mounted () {
      this.init()
    },
    // 钩子函数，激活组件时候调用
    activated () {
      this.processCode && this.fetchData()
    },
    // 钩子函数，解除组件时调用
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
