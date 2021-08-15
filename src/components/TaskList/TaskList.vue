<template>
  <h1 class="pt-5" >{{ name }}</h1>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <div v-if="taskListEntries.length === 0" class="task-drop-box row align-items-center">
        <span class="col-6 mx-auto">
          Drop Tasks Here
        </span>
      </div>
      <draggable
          :list="taskListEntries"
          class="list-group"
          ghost-class="ghost"
          animation="200"
          item-key="id"
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
</template>

<script>
import draggable from "vuedraggable";
import TaskListEntry from "@/components/TaskList/TaskListEntry";
import TaskApi from "@/components/TaskApi";
import TaskListApi from "@/components/TaskList/TaskListApi";

export default {
  name: "TodoList",
  components: {TaskListEntry, draggable},
  props:{
    name: String,
    taskListApi: TaskListApi,
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
    await this.updateTaskListEntries()
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
    async updateTaskListEntries(){
      let taskIDs = await this.taskListApi.getTaskIDs()
      let taskListEntries = await Promise.all(taskIDs.map(async (taskID) => await this.taskListEntryApi.getTask(taskID)))
      let order = this.getSavedOrder()
      this.taskListEntries = orderTaskListEntries(taskListEntries, order)
    },
    async onRemove(task){
      await this.taskListApi.removeTaskID(task.id)
      await this.updateTaskListEntries()
    },
    async onInternalChange(event){
      console.log(event)
      if('added' in event){
        let task = event.added.element

        //let sameIDTasks = this.taskListEntries.filter(e => e.id === task.id)
        //if(sameIDTasks.length > 0){
        //  return
        //
        //}

        console.log("put task", task , "into", this.apiUrl)
        await this.taskListApi.addTaskID(task.id)
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
.task-drop-box{
  background: #808080;
  height: 3cm;
  opacity: 0.4;
  border-radius: 10px;
  border-style: dashed;
}
</style>
