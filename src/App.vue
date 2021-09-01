<template>
  <div class="container main-container">
    <PomoTimer apiUrl="http://127.0.0.1:5000/api/pomo"/>
    <PomoTaskSlot v-model:pomo-task="pomoTask" v-model:pomo-task-list-api="pomoTaskListApi" />
    <TaskList name="Pomo List" :taskListEntryApi="taskApi" v-model:task-list-api="pomoTaskListApi" v-model:pomo-task="pomoTask"/>
    <TaskAddBox
      :taskApi="taskApi"
      v-on:taskCreated="onTaskAdd"
    />
    <EveryDayTasks v-if="false" :every-day-task-api="everyDayTaskApi" v-model:blacklist-api="pomoTaskListApi" v-model:pomo-task="pomoTask"/>
    <OneTimeTasks v-if="false" :one-time-task-api="oneTimeTaskApi" v-model:blacklist-api="pomoTaskListApi" v-model:pomo-task="pomoTask"/>
  </div>
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
import PomoTaskSlot from "@/components/PomoTaskSlot/PomoTaskSlot";
import TaskAddBox from "./components/AddTask/TaskAddBox";

export default {
  name: 'App',
  components: {
    TaskAddBox,
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
  methods:{
    async onTaskAdd(task){
      // automatically add it to pomo List
      await this.pomoTaskListApi.addTaskID("one_time_task/"+task['task_id'])
    }
  }
}
</script>

<style>

.main-container {
  max-width: 40em;
}


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
