<template>
  <TaskAddButton
    v-if="!taskCreationWindowOpen"
    v-on:taskAdd="openTaskCreationWindow"
  />
  <TaskCreationBox
    v-if="taskCreationWindowOpen"
    v-bind:oneTimeTaskApi="taskApi.oneTimeTaskApi"
    v-on:taskCreated="onTaskCreated"
  />
</template>

<script>
import TaskAddButton from "./TaskAddButton";
import TaskCreationBox from "./TaskCreationBox";
import TaskApi from "../TaskApi";

export default {
  name: "TaskAddBox",
  props:{
    taskApi: TaskApi
  },
  emits: [
    "taskCreated"
  ],
  setup(props, { emit }) {
    return {
      notifyTaskCreated: (task) => {
        emit("taskCreated", task)
      }
    }
  },
  components: {
    TaskCreationBox,
    TaskAddButton
  },
  data(){
    return {
      taskCreationWindowOpen: true
    }
  },
  methods:{
    openTaskCreationWindow(){
      this.taskCreationWindowOpen = true
    },
    onTaskCreated(task){
      this.taskCreationWindowOpen = false
      this.notifyTaskCreated(task)
    }
  }
}
</script>

<style scoped>

</style>