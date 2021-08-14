<template>
  <PomoTimer v-if="false" apiUrl="http://127.0.0.1:5000/api/pomo"/>
  <TodoList v-bind:taskList="pomoTasks"/>
  <!--
  <TodoList v-bind:taskList="everyDayTasks"/>
  <TodoList v-bind:taskList="oneTimeTasks"/>
  -->
</template>

<script>
import PomoTimer from './components/PomoTimer/PomoTimer.vue'
import TodoList from "./components/PomoTodos/TodoList.vue"
import TaskList from "@/components/PomoTodos/TaskList";
import axios from "axios";
import LinkedTask from "@/components/PomoTodos/LinkedTask";

let apiUrl = "http://127.0.0.1:5000/api/task"

class TaskContainer{
  allTasks = []
  createTaskFromData(taskData){
    let sameIDTasks = this.allTasks.filter(task => task.taskID === taskData.task_id)
    if (sameIDTasks.length > 0){
      return sameIDTasks[0]
    }else{
      let newTask = new LinkedTask(taskData, apiUrl)
      this.allTasks.push(newTask)
      return newTask
    }
  }
}


export default {
  name: 'App',
  components: {
    PomoTimer,
    TodoList
  },
  async mounted(){
    let taskContainer = new TaskContainer()

    let pomoTasks = await axios.get(apiUrl+ "/" + "pomo_tasks")
        .then(response => response.data)
        .then(tasks => tasks.map(taskData => taskContainer.createTaskFromData(taskData) ))
    let everyDayTasks = await axios.get(apiUrl+ "/" + "every_day_tasks")
        .then(response => response.data)
        .then(tasks => tasks.map(taskData => taskContainer.createTaskFromData(taskData) ))
    let oneTimeTasks = await axios.get(apiUrl+ "/" + "one_time_tasks")
        .then(response => response.data)
        .then(tasks => tasks.map(taskData => taskContainer.createTaskFromData(taskData) ))

    this.pomoTasks.tasks = pomoTasks
    this.everyDayTasks.tasks = everyDayTasks
    this.oneTimeTasks.tasks = oneTimeTasks
  },
  data(){
    return {
      pomoTasks: new TaskList([], "Pomo Tasks"),
      everyDayTasks: new TaskList([], "Every Day Tasks"),
      oneTimeTasks: new TaskList([], "One Time Tasks"),
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
