<template>
  <h1 class="pt-5" >{{ name }}</h1>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <draggable
          :list="taskEntries"
          class="list-group"
          ghost-class="ghost"
          item-key="id"
          :group="{ name: 'tasks', pull: 'clone', put: false }"
      >
        <template #item="{ element }">
          <template v-if="!hideTask(element)">
            <TaskEntry
                v-model:description="element.description"
                v-model:already-done-today="element.completed"
                @onAddToPomo="() => addToPomo(element)"
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
import TaskEntry from "@/components/EveryDayTasks/EveryDayTaskEntry";
import EveryDayTaskApi from "@/components/EveryDayTasks/EveryDayTaskApi";
import TaskListApi from "@/components/TaskList/TaskListApi";

export default {
  name: "TodoList",
  components: {TaskEntry, draggable},
  props:{
    everyDayTaskApi: EveryDayTaskApi,
    taskListEntryApi: TaskApi,
    blacklistApi: TaskListApi,
    pomoTask: String,
  },
  data(){
    return {
      name: "Every Day Tasks",
      taskEntries:[],
      blackListedIDs: []
    }
  },
  async mounted() {
    this.blacklistApi.onChanged.on("changed", async ()=>{
      this.blackListedIDs = await this.blacklistApi.getTaskIDs()
    })
    this.blackListedIDs = await this.blacklistApi.getTaskIDs()
    this.taskEntries = await this.everyDayTaskApi.fetchAll()
  },
  methods:{
    addToPomo: function (task){
      this.blacklistApi.addTaskID(task.id)
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
      return false
    }
  }
}

</script>

<style scoped>
</style>
