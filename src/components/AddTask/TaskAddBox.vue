<template>
  <TaskAddButton
    v-if="!taskCreationWindowOpen"
    v-on:taskAdd="openTaskCreationWindow"
  />
  <TaskCreationBox
    v-if="taskCreationWindowOpen"
    v-on:createTask="onCreateTask"
  />
</template>

<script>
import TaskAddButton from "./TaskAddButton";
import TaskCreationBox from "./TaskCreationBox";

export default {
  name: "TaskAddBox",
  emits: [
    "createTask"
  ],
  setup(props, { emit }) {
    return {
      notifyTaskCreated: (task) => {
        emit("createTask", task)
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
    onCreateTask(task){
      this.taskCreationWindowOpen = false
      this.notifyTaskCreated(task)
    }
  }
}
</script>

<style scoped>

</style>