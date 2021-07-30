<template>
  <PomoTimer apiUrl="https://smriti.denines.de/api/pomo"/>
</template>

<script>
import PomoTimer from './components/PomoTimer.vue'

export default {
  name: 'App',
  components: {
    PomoTimer
  }
}
</script>

<style>

body{
    background: rgb(244,236,225)
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
