<template>
  <h1>lol</h1>
   <TaskAddBox v-if="true" v-on:createTask="addTaskWithTag"/>
</template>

<script>
import TaskAddBox from "./TaskAddBox";

export default {
  name: "TaskAddBox",
  props:{
    tag: String,
    tasks: Array,
  },
  components: {
    TaskAddBox,
  },
  setup(props, { emit }) {
    return {
      addTaskWithTag: (task)=>{
        task['tags'] = ['pomo']
        let tasks = this.tasks
        tasks.push(task)
        emit('update:tasks', task)
      },
    }
  },
}
</script>

<style scoped>

</style>