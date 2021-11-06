<template>
  <div v-if="loading">LOADING</div>
  <div class="container main-container">
    <PomoTimer
      apiUrl="https://smriti.denines.de/api/pomo_timer"
    />
    <template v-if="false" >
      <PomoTaskSlot
        v-model:task="pomoTask"
        v-on:onPomoTaskRemove="clearPomoTask"
      />
      <h1 class="pt-5" data-bs-toggle="collapse" data-bs-target="#PomoTaskListCollapse" >
        Pomo List
      </h1>
      <div class="collapse show" id="PomoTaskListCollapse">
        <TagTaskList tag="pomo" v-model:tasks="tasks" v-on:promoteTask="promoteTask"/>
        <TaskAddBox v-on:createTask="onTaskAdd"/>
        <TaggedTaskAddBox tag="pomo" />
      </div>
      <h1 class="pt-5" data-bs-toggle="collapse" data-bs-target="#BreakTaskListCollapse" >
        Break List
      </h1>
      <div class="collapse show" id="BreakTaskListCollapse">
        <TagTaskList tag="break" v-model:tasks="tasks" v-on:promoteTask="promoteTask"/>
      </div>


      <EveryDayTasks v-if="false" :every-day-task-api="everyDayTaskApi" v-model:blacklist-api="pomoTaskListApi" v-model:pomo-task="pomoTask"/>
      <OneTimeTasks v-if="false" :one-time-task-api="oneTimeTaskApi" v-model:blacklist-api="pomoTaskListApi" v-model:pomo-task="pomoTask"/>
    </template>

  </div>
  <template v-if="false" >
    <div v-for="task in pomoTasks" :key="task._id">
      {{task}}
    </div>

  </template>

</template>

<script>
import PomoTimer from './components/PomoTimer/PomoTimer.vue'
import TagTaskList from "./components/TaskList/TagTaskList.vue"
import TaggedTaskAddBox from "./components/AddTask/TaggedTaskAddBox.vue"
import EveryDayTasks from "@/components/EveryDayTasks/EveryDayTasks";
import OneTimeTasks from "@/components/OneTimeTasks/OneTimeTasks";
import PomoTaskSlot from "@/components/PomoTaskSlot/PomoTaskSlot";
import TaskAddBox from "./components/AddTask/TaskAddBox";
import axios from "axios";
import {watch} from "vue";

let apiUrl = "http://127.0.0.1:5000/api"


class TaskListWatcher{

  constructor(taskList) {
    this.taskList = taskList
    for (let task of this.taskList) {
      this.watchTask(task)
    }

    watch(taskList, async (oldTaskList, newTaskList) => {
      let addedTasks = newTaskList.filter(task => !('_id' in task))
      for(const task of addedTasks){
        console.log('task was added!')
        let response = await axios.post(apiUrl + "/task", taskToData(task))
        task["_id"] = response.data
        this.watchTask(task)
      }
    })
  }


  watchTask(task){
    //console.log("start watching ", task['_id'])
    watch(task, (oldTaskData, newTaskData) => {
      console.info("updated task", oldTaskData, newTaskData);
      axios.put(apiUrl + "/task/" + task['_id'] , taskToData(task))
        .then(response => response.data)
    })
  }



}



export default {
  name: 'App',
  components: {
    TaskAddBox,
    PomoTimer,
    TagTaskList,
    EveryDayTasks,
    OneTimeTasks,
    PomoTaskSlot,
    TaggedTaskAddBox,
  },
  data(){
    return {
      loading: true,
      tasks: undefined,
      pomoTask: undefined,
    }
  },
  computed:{
    pomoTasks: function (){
      if (this.tasks == null){
        return []
      }
      return this.tasks.filter(
        (t) => {
          if('tags' in t){
            return t['tags'].includes('pomo')
          }
          return false
        })
    }
  },
  watch: {
  },
  mounted(){
    axios.get(apiUrl + "/task")
      .then(response => response.data)
      .then((tasks) => {
        this.tasks = tasks
        new TaskListWatcher(this.tasks)
        return tasks
      })
      .finally(() => this.loading = false)

  },
  methods:{
    clearPomoTask(){
      this.pomoTask = undefined
    },
    async onTaskAdd(task){
      task['tags'] = ['pomo']
      this.tasks.push(task)
    },
    async removeTaskFromList(task){
      task['tags'] = task['tags'].filter(tag => tag !== 'pomo')
      console.log("remove Task from list", task)
      //await this.updateTask(task)
    },

    async promoteTask(task){
      this.pomoTask = task
    }
  },
}


function taskToData(task){
  let data = new FormData()
  for (let key in task ) {
    data.append(key, task[key]);
  }
  return data
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
