<template>
  <div class="m-table">
    <h1 class="title">{{ process.process_name }}</h1>
    <table class="table">
      <!-- <caption>工序日报表</caption> -->
      <thead>
        <tr>
          <th>日期</th>
          <th>班次</th>
          <th>工序</th>
          <th>批次</th>
          <th>投入</th>
          <th>产出</th>
          <th>不良</th>
          <th>不良率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in dataList" :key="idx">
          <td>{{item.P_date.substr(0, 10)}}</td>
          <td>{{item.Class_code}}</td>
          <td>{{item.P_name}}</td>
          <td>{{item.OrderN0}}</td>
          <td>{{item.Initqty}}</td>
          <td>{{item.Qty}}</td>
          <td>{{item.Fqty}}</td>
          <td>{{item.Frate}}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'MTable',
    props: {
      process: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        dataList: []
      }
    },
    watch: {
      'process': 'fetchData'
    },
    methods: {
      fetchData () {
        this.$http.get(`/DataAPI/ProduceReport/processInOutNg.ashx?process_code=${this.process.process_code}`).then(res => {
          this.dataList = res.data.InOutNgList
        }).catch(err => console.error(err))
      }
    },
    mounted () {
      this.process && this.fetchData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-table {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .title {
    margin: 20px;
    font-size: 20px;
    font-weight: bold;
  }

  .table {
    width: 98%;
    margin: 1%;
    border: 1px solid #aaa;
    overflow: scroll;
  }

  .table caption {
    padding: 10px;
    font-weight: bold;
  }
/*
  .table th:nth-child(1), .table td:nth-child(1) {
    width: 10%;
    text-align: center;
  }
  .table th:nth-child(2), .table td:nth-child(2) {
    width: 10%;
    text-align: center;
  }
  .table th:nth-child(n+3), .table td:nth-child(n+3) {
    width: 10%;
    text-align: center;
  } */

  .table th,
  .table td {
    font-weight: normal;
    font-size: 18px;
    padding: 15px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    border-top: 1px solid #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .table th:not(:last-child),
  .table td:not(:last-child) {
    border-right: 1px solid  #aaa;
    box-sizing: border-box;
  }

  .table thead th {
    font-weight: bold;
    background: #bfdbff;
    vertical-align: bottom;
  }
  .table tbody > tr:nth-child(even) > td,
  .table tbody > tr:nth-child(even) > th {
    background-color: #f6f6f6;
  }
  .table .t-small {
    width: 5%;
  }
  .table .t-medium {
    width: 15%;
  }
  .table .t-status {
    font-weight: bold;
  }
  .table .t-active {
    color: #46a546;
  }
  .table .t-inactive {
    color: #e00300;
  }
  .table .t-draft {
    color: #f89406;
  }
  .table .t-scheduled {
    color: #049cdb;
  }
</style>
