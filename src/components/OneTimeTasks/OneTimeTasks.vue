<template>
  <h1 class="pt-5" >{{ name }}</h1>
  <button class="btn btn-secondary" v-on:click="toggleCompleted">
    {{ showCompleted?'hide completed':'show completed'}}
  </button>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <draggable
          :list="taskEntries"
          class="list-group"
          ghost-class="ghost"
          item-key="id"
          :group="{ name: 'tasks', pull: 'clone', put: false }"
      >
        <template #item="{ element }" >
          <template v-if="!hideTask(element)" >
            <OneTimeTaskEntry
                v-model:description="element.description"
                v-model:completed="element.completed"
            />
          </template>
        </template>
      </draggable>
  </ul>
  </span>
</template>

<script>
import draggable from "vuedraggable";
import TaskApi from "@/components/TaskApi";
import OneTimeTaskApi from "@/components/OneTimeTasks/OneTimeTaskApi";
import OneTimeTaskEntry from "@/components/OneTimeTasks/OneTimeTaskEntry";
import TaskListApi from "@/components/TaskList/TaskListApi";

export default {
  name: "TodoList",
  components: {OneTimeTaskEntry, draggable},
  props:{
    oneTimeTaskApi: OneTimeTaskApi,
    taskListEntryApi: TaskApi,
    blacklistApi: TaskListApi,
    pomoTask: String,
  },
  data(){
    return {
      name: "Every Day Tasks",
      taskEntries:[],
      blackListedIDs: [],
      showCompleted : false,
    }
  },
  async mounted() {
    this.blacklistApi.onChanged.on("changed", async ()=>{
      this.blackListedIDs = await this.blacklistApi.getTaskIDs()
    })
    this.blackListedIDs = await this.blacklistApi.getTaskIDs()
    this.taskEntries = await this.oneTimeTaskApi.fetchAll()
  },
  methods: {
    toggleCompleted: function(){
      this.showCompleted =! this.showCompleted
    },
    hideTask: function(task){
      if(this.blackListedIDs.includes(task.id)){
        return true
      }
      if(this.pomoTask != null){
        if(task.id === this.pomoTask.id){
          return true
        }
      }
      if(!this.showCompleted){
        if(task.completed){
          return true
        }
      }
      return false
    },
  }
}

</script>

<style scoped>
</style>
