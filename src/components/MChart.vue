<template>
  <div class="m-chart">
    <h1 class="title">{{ process.process_name }}</h1>
    <div class="container">
      <y-bar :process-code="process.process_code"></y-bar>
    </div>
  </div>
</template>

<script>
  import YBar from '@/components/common/YBar'
  export default {
    name: 'MChart',
    components: {
      YBar
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
  .m-chart {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .container {
    position: absolute;
    top: 15%;
    right: 0;
    bottom: 0;
    left: 0;
    height: 80%;
  }

  .title {
    margin: 20px;
    font-size: 48px;
    font-weight: bold;
  }
</style>
