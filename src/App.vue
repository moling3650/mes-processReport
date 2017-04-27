<template>
  <div id="app">
    <transition name="slide-left">
      <router-view :process="currentProcess"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        routeMap: ['/', '/chart', '/charts'],
        rm_index: 0,
        processList: [],
        pl_index: 0
      }
    },
    computed: {
      currentProcess () {
        return (this.processList.length <= this.pl_index) ? {} : this.processList[this.pl_index]
      }
    },
    created () {
      this.$http.get('/DataAPI/ProduceReport/processInOutNg.ashx?ActType=GetProcessCode').then(res => {
        this.processList = res.data.ProcessList
        if (this.processList.length > 0) {
          setInterval(this.changePage, 40000)
        }
      }).catch(err => console.error(err))
    },
    methods: {
      changePage () {
        this.rm_index = (this.rm_index + 1) % this.routeMap.length
        if (this.rm_index === 0) {
          this.pl_index = (this.pl_index + 1) % this.processList.length
        }
        this.$router.push(this.routeMap[this.rm_index])
      }
    }
  }
</script>

<style>
  #app {
    position: relative;
    height: 100%;
    text-align: center;
  }

  .slide-left-enter-active, .slide-left-leave-active {
    transition: all .3s;
  }

  .slide-left-enter {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-left-leave-active {
    transform: translateX(-100%);
    opacity: 0;
  }
</style>
