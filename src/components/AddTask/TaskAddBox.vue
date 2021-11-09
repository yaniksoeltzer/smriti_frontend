<template>
  <div
    v-click-outside="close"
  >
    <TaskAddButton
      v-if="!taskCreationWindowOpen"
      v-on:taskAdd="openTaskCreationWindow"
    />
    <TaskCreationBox
      ref="taskDescriptionBox"
      v-if="taskCreationWindowOpen"
      v-on:createTask="onCreateTask"
    />
  </div>
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
      taskCreationWindowOpen: false
    }
  },
  methods:{
    openTaskCreationWindow(){
      this.taskCreationWindowOpen = true
    },
    onCreateTask(task){
      this.taskCreationWindowOpen = false
      this.notifyTaskCreated(task)
    },
    close(){
      this.taskCreationWindowOpen = false
    },
  }
}
</script>

<style scoped>

</style>