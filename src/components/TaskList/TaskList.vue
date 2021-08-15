<template>
  <h1 class="pt-5" >{{ name }}</h1>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <div v-if="taskListEntries.length === 0">
          PASE HERE
        </div>
      <draggable
          :list="taskListEntries"
          class="list-group"
          ghost-class="ghost"
          animation="200"
          :group="{ name: 'tasks', pull: 'clone', put: true }"
          @change="onInternalChange"
      >
        <template #item="{ element }">
          <TaskListEntry
              v-model:description="element.description"
              v-model:completed="element.completed"
              @onRemove="()=> onRemove(element)"
          />
        </template>
      </draggable>
  </ul>
  </span>
  {{taskListEntries}}
</template>

<script>
import draggable from "vuedraggable";
import TaskListEntry from "@/components/TaskList/TaskListEntry";
import axios from "axios";
import TaskApi from "@/components/TaskApi";

export default {
  name: "TodoList",
  components: {TaskListEntry, draggable},
  props:{
    name: String,
    apiUrl: String,
    taskListEntryApi: TaskApi,
  },
  data(){
    return {
      taskListEntries:[],
      name_: this.name
    }
  },
  computed:{
    localStorageKey: function(){
      return this.name_ +" " + "order"
    }
  },
  async mounted() {
    let taskIDs = await axios.get(this.apiUrl)
        .then(response => response.data)
    let taskListEntries = await Promise.all(taskIDs.map(async (taskID) => await this.taskListEntryApi.getTask(taskID)))
    let order = this.getSavedOrder()
    this.taskListEntries = orderTaskListEntries(taskListEntries, order)
  },
  methods:{
    getSavedOrder(){
      let savedOrder = localStorage.getItem(this.localStorageKey)
      if(savedOrder == null){
        savedOrder = []
      }else{
        savedOrder = JSON.parse(savedOrder)
      }
      console.log(savedOrder)
      return savedOrder
    },
    saveCurrentOrder(){
      if(this.taskListEntries.length > 0 ) {
        let currentOrder = this.taskListEntries.map((task) => task.url)
        localStorage.setItem(this.localStorageKey, JSON.stringify(currentOrder))
      }
    },
    async onTaskPut(task){
      console.log("put task", task , "into", this.apiUrl)
      let taskID = task.id
      let data = new FormData()
      data.append("task_id", taskID)
      await axios.post(this.apiUrl, data)
    },
    onRemove(task){
      let id = task["id"].split("/")[1]
      console.log("onRemove", task)
      axios.delete(this.apiUrl + "/" + id)
      this.taskListEntries = this.taskListEntries.filter((entry) => entry.id !== task["id"])
    },
    async onInternalChange(event){
      console.log(event)
      if('added' in event){
        let taskID = event.added.element.id
        let data = new FormData()
        data.append("task_id", taskID)
        await axios.post(this.apiUrl, data)
      }
      this.saveCurrentOrder()
    },
  },
}



function orderTaskListEntries(taskListEntries, taskOrder){
  if(taskListEntries.length <= 1){
    return taskListEntries
  }
  let orderedTasks = []
  for (let taskUrl of taskOrder){
    orderedTasks.push(...taskListEntries.filter((task) => task.url === taskUrl))
  }
  let newTasks = taskListEntries.filter((task) => !taskOrder.includes(task.url))
  orderedTasks.push(...newTasks)
  return orderedTasks
}
</script>

<style scoped>
</style>
