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
          <TaskEntry
              v-model:description="element.description"
          />
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

export default {
  name: "TodoList",
  components: {TaskEntry, draggable},
  props:{
    everyDayTaskApi: EveryDayTaskApi,
    taskListEntryApi: TaskApi,
  },
  data(){
    return {
      name: "Every Day Tasks",
      taskEntries:[],
    }
  },
  async mounted() {
    this.taskEntries = await this.everyDayTaskApi.fetchAll()
  }
}

</script>

<style scoped>
</style>
