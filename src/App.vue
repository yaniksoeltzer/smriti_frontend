<template>
  <PomoTimer v-if="false" apiUrl="http://127.0.0.1:5000/api/pomo"/>
  <TaskList name="Pomo List" :taskListEntryApi="taskApi" :api-url="this.apiUrl + '/task_list/pomo'" />
  <EveryDayTasks :every-day-task-api="everyDayTaskApi"/>
  <OneTimeTasks :one-time-task-api="oneTimeTaskApi"/>
  <!--
  <TaskList name="Every Day Tasks" v-model:tasks="everyDayTasks" :put-able="false"/>
  <TaskList name="One Time Tasks" v-model:tasks="oneTimeTasks" :put-able="false"/>
  -->
</template>

<script>
import PomoTimer from './components/PomoTimer/PomoTimer.vue'
import TaskList from "./components/TaskList/TaskList.vue"
import TaskApi from "@/components/TaskApi"
import EveryDayTaskApi from "@/components/EveryDayTasks/EveryDayTaskApi";
import OneTimeTaskApi from "@/components/OneTimeTasks/OneTimeTaskApi";
import EveryDayTasks from "@/components/EveryDayTasks/EveryDayTasks";
import OneTimeTasks from "@/components/OneTimeTasks/OneTimeTasks";

export default {
  name: 'App',
  components: {
    PomoTimer,
    TaskList,
    EveryDayTasks,
    OneTimeTasks,
  },
  methods:{
    onTaskPut(e){
      console.log("on task Put", e)
    }
  },
  async mounted(){
    this.everyDayTasks = await this.everyDayTaskApi.fetchAll()
    this.oneTimeTasks = await this.oneTimeTaskApi.fetchAll()
  },
  data(){
    let apiUrl = "http://127.0.0.1:5000/api"
    let everyDayTaskApi = new EveryDayTaskApi(apiUrl+"/task/every_day_task")
    let oneTimeTaskApi = new OneTimeTaskApi(apiUrl+"/task/one_time_task")
    let genericTaskApi = new TaskApi(oneTimeTaskApi, everyDayTaskApi)
    return {
      apiUrl: "http://127.0.0.1:5000/api",
      taskApi : genericTaskApi,
      oneTimeTaskApi: oneTimeTaskApi,
      everyDayTaskApi: everyDayTaskApi,
    }
  },
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
