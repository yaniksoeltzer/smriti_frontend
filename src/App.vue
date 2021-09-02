<template>
  <div class="container main-container">
    <PomoTimer apiUrl="http://127.0.0.1:5000/api/pomo"/>
    <PomoTaskSlot
      v-model:task="pomoTask"
      v-on:completeTask="completeTask"
      v-on:inCompleteTask="inCompleteTask"
      v-on:onPomoTaskRemove="clearPomoTask"
    />
    <TaskList
      name="Pomo List"
      v-model:tasks="pomoTasks"
      v-on:removeTask="removeTaskFromList"
      v-on:completeTask="completeTask"
      v-on:inCompleteTask="inCompleteTask"
      v-on:promoteTask="promoteTask"
    />
    <TaskAddBox
      v-on:createTask="onTaskAdd"
    />
    <EveryDayTasks v-if="false" :every-day-task-api="everyDayTaskApi" v-model:blacklist-api="pomoTaskListApi" v-model:pomo-task="pomoTask"/>
    <OneTimeTasks v-if="false" :one-time-task-api="oneTimeTaskApi" v-model:blacklist-api="pomoTaskListApi" v-model:pomo-task="pomoTask"/>
  </div>
  <div v-for="task in pomoTasks" :key="task._id">
    {{task}}
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
import axios from "axios";
let apiUrl = "http://127.0.0.1:5000/api"

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
    let everyDayTaskApi = new EveryDayTaskApi(apiUrl+"/task/every_day_task")
    let oneTimeTaskApi = new OneTimeTaskApi(apiUrl+"/task/one_time_task")
    let genericTaskApi = new TaskApi(oneTimeTaskApi, everyDayTaskApi)
    let pomoTaskListApi = new TaskListApi(apiUrl + "/task_list/pomo")
    axios.get(apiUrl + "/task")
      .then(response => response.data)
      .then(tasks => this.tasks=tasks)
    return {
      tasks:[],
      pomoTask: undefined,
      apiUrl: "http://127.0.0.1:5000/api",
      taskApi : genericTaskApi,
      oneTimeTaskApi: oneTimeTaskApi,
      everyDayTaskApi: everyDayTaskApi,
      pomoTaskListApi: pomoTaskListApi
    }
  },
  computed:{
    pomoTasks: function (){
      return this.tasks.filter(
        (t) => {
          if('tags' in t){
            return t['tags'].includes('pomo')
          }
          return false
        })
    }
  },
  methods:{
    taskToData(task){
      let data = new FormData()
      for (let key in task ) {
        data.append(key, task[key]);
      }
      console.log(data)
      return data
    },
    clearPomoTask(){
      this.pomoTask = undefined
    },
    async updateTask(task){
      await axios.put(apiUrl + "/task/" + task['_id'] , this.taskToData(task))
        .then(response => response.data)
    },
    async onTaskAdd(task){
      task['tags'] = ['pomo']
      let taskID = await axios.post(apiUrl + "/task", this.taskToData(task))
        .then(response => response.data)
      task["_id"] = taskID
      this.tasks.push(task)
    },
    async removeTaskFromList(task){
      task['tags'] = task['tags'].filter(tag => tag !== 'pomo')
      console.log("remove Task from list", task)
      await this.updateTask(task)
    },
    async completeTask(task){
      task['completedAt'] = new Date().toISOString()
      await this.updateTask(task)
    },
    async inCompleteTask(task){
      delete task.completedAt
      await this.updateTask(task)
    },
    async promoteTask(task){
      this.pomoTask = task
      console.log(task)
    }
  },
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
