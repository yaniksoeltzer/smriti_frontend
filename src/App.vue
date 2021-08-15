<template>
  <PomoTimer v-if="false" apiUrl="http://127.0.0.1:5000/api/pomo"/>
  <TaskList name="Pomo List" :tasks="pomoTasks" :put-able="true" />
  <TaskList name="Every Day Tasks" :tasks="everyDayTasks" :put-able="false"/>
  <TaskList name="One Time Tasks" :tasks="oneTimeTasks" :put-able="false"/>
</template>

<script>
import PomoTimer from './components/PomoTimer/PomoTimer.vue'
import TaskList from "./components/PomoTodos/TaskList.vue"
import TaskApi from "@/components/PomoTodos/TaskApi"
import JTaskList from "@/components/PomoTodos/TaskListApi";
import EveryDayTaskApi from "@/components/PomoTodos/EveryDayTaskApi";
import OneTimeTaskApi from "@/components/PomoTodos/OneTimeTaskApi";

export default {
  name: 'App',
  components: {
    PomoTimer,
    TaskList
  },
  async mounted(){
    let apiUrl = "http://127.0.0.1:5000/api"

    let everyDayTaskApi = new EveryDayTaskApi(apiUrl+"/task/every_day_task")
    let everyDayTasks = await everyDayTaskApi.fetchAll()

    let oneTimeTaskApi = new OneTimeTaskApi(apiUrl+"/task/one_time_task")
    let oneTimeTasks = await oneTimeTaskApi.fetchAll()

    let genericTaskApi = new TaskApi(oneTimeTaskApi, everyDayTaskApi)

    let pomoTaskList = new JTaskList(apiUrl + "/task_list/pomo")
    let taskIDs = await pomoTaskList.fetchAll()

    let pomoTasks = await Promise.all(taskIDs.map(async (taskID) => await genericTaskApi.getTask(taskID)))
    console.log("everyDayTasks", everyDayTasks)
    console.log("oneTimeTasks", oneTimeTasks)
    console.log("pomoTasks", pomoTasks)
    this.everyDayTasks = everyDayTasks
    this.oneTimeTasks = oneTimeTasks
    this.pomoTasks = pomoTasks
  },
  data(){
    return {
      everyDayTasks: [],
      oneTimeTasks: [],
      pomoTasks: [],
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
