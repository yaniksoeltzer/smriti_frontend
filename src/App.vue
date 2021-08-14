<template>
  <PomoTimer v-if="false" apiUrl="http://127.0.0.1:5000/api/pomo"/>
  <TodoList name="Pomo List" :task-list="this.pomoTaskList"/>
  <TodoList name="Every Day Tasks" :task-list="this.everDayTaskList"/>
  <!--
    <TodoList v-bind:taskList="everyDayTaskList"/>
    <TodoList v-bind:taskList="oneTimeTasks"/>
  -->
</template>

<script>
import PomoTimer from './components/PomoTimer/PomoTimer.vue'
import TodoList from "./components/PomoTodos/TodoList.vue"
import TaskFactory from "@/components/PomoTodos/TaskFactory"
import TaskList from "@/components/PomoTodos/TaskList";

export default {
  name: 'App',
  components: {
    PomoTimer,
    TodoList
  },
  async mounted(){
  },
  data(){
    let apiUrl = "http://127.0.0.1:5000/api"
    let taskFactory = new TaskFactory(apiUrl + "/task")
    return {
      apiUrl: apiUrl,
      taskFactory: taskFactory,
      pomoTaskList: new TaskList(apiUrl + "/task_list/pomo", taskFactory),
      everDayTaskList: new TaskList(apiUrl + "/task_list/every_day_task", taskFactory)
    }
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
