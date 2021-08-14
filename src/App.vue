<template>
  <PomoTimer v-if="false" apiUrl="http://127.0.0.1:5000/api/pomo"/>
  <TodoList apiUrl="http://127.0.0.1:5000/api/task/pomo_tasks"/>
</template>

<script>
import PomoTimer from './components/PomoTimer.vue'
import TodoList from "./components/TodoList.vue"

export default {
  name: 'App',
  components: {
    PomoTimer,
    TodoList
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
