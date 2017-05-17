<template>
  <div class="m-charts">
    <h1 class="title">{{ process.process_name }}</h1>
    <div class="container">
      <x-bar width="50%"
        title="不良现象"
        api="GetNg_Code"
        :process-code="process.process_code || ''">
      </x-bar>
      <pie width="50%"
        api="GetNg_Code"
        :process-code="process.process_code || ''">
      </pie>
    </div>
  </div>
</template>

<script>
  import XBar from '@/components/common/XBar'
  import Pie from '@/components/common/Pie'

  export default {
    name: 'MCharts',
    components: {
      XBar,
      Pie
    },
    props: {
      process: {
        type: Object,
        required: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-charts {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    font-size: 0;
  }

  .container {
    position: absolute;
    top: 15%;
    right: 0;
    bottom: 0;
    left: 0;
    height: 70%;
    border: 1px solid #333;
    margin: 5px;
    font-size: 0;
  }

  .title {
    margin: 20px;
    font-size: 48px;
    font-weight: bold;
  }

  .x-bar, .pie {
    display: inline-block;
    box-sizing: border-box;
  }

  .x-bar {
    border-right: 1px solid #333;
  }
</style>
