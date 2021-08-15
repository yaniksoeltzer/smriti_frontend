<template>
  <PomoTimer apiUrl="http://127.0.0.1:5000/api/pomo"/>
  <PomoTaskSlot v-model:pomo-task="pomoTask"/>
  <TaskList name="Pomo List" :taskListEntryApi="taskApi" :task-list-api="pomoTaskListApi"/>
  <EveryDayTasks :every-day-task-api="everyDayTaskApi" :blacklist-api="pomoTaskListApi"/>
  <OneTimeTasks :one-time-task-api="oneTimeTaskApi" :blacklist-api="pomoTaskListApi"/>
</template>

<script>
import PomoTimer from './components/PomoTimer/PomoTimer.vue'
import TaskList from "./components/TaskList/TaskList.vue"
import TaskApi from "@/components/TaskApi"
import EveryDayTaskApi from "@/components/EveryDayTasks/EveryDayTaskApi";
import OneTimeTaskApi from "@/components/OneTimeTasks/OneTimeTaskApi";
import EveryDayTasks from "@/components/EveryDayTasks/EveryDayTasks";
import OneTimeTasks from "@/components/OneTimeTasks/OneTimeTasks";
import TaskListApi from "@/components/TaskList/TaskListApi";
import PomoTaskSlot from "@/components/PomoTaskSlot";

export default {
  name: 'App',
  components: {
    PomoTimer,
    TaskList,
    EveryDayTasks,
    OneTimeTasks,
    PomoTaskSlot,
  },
  data(){
    let apiUrl = "http://127.0.0.1:5000/api"
    let everyDayTaskApi = new EveryDayTaskApi(apiUrl+"/task/every_day_task")
    let oneTimeTaskApi = new OneTimeTaskApi(apiUrl+"/task/one_time_task")
    let genericTaskApi = new TaskApi(oneTimeTaskApi, everyDayTaskApi)
    let pomoTaskListApi = new TaskListApi(apiUrl + "/task_list/pomo")
    return {
      pomoTask: undefined,
      apiUrl: "http://127.0.0.1:5000/api",
      taskApi : genericTaskApi,
      oneTimeTaskApi: oneTimeTaskApi,
      everyDayTaskApi: everyDayTaskApi,
      pomoTaskListApi: pomoTaskListApi
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
