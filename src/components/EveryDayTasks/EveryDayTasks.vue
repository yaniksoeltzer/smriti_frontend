<template>
  <h1 class="pt-5" >{{ name }}</h1>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <draggable
          :list="taskEntries"
          class="list-group"
          ghost-class="ghost"
          :group="{ name: 'tasks', pull: 'clone', put: false }"
      >
        <template #item="{ element }">
          <template v-if="!blackListedIDs.includes(element.id)">
            <TaskEntry
                v-model:description="element.description"
                v-model:already-done-today="element.completed"
            />
          </template>
        </template>
      </draggable>
  </ul>
  </span>
  {{taskEntries}}
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
      console.log("blacklist has changed!", this.blackListedIDs)
    })
    this.blackListedIDs = await this.blacklistApi.getTaskIDs()
    this.taskEntries = await this.everyDayTaskApi.fetchAll()
  }
}

</script>

<style scoped>
</style>
