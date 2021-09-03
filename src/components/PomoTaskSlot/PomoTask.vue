<template>
  <TaskBase
    :task="task"
    v-on:onRemove="onRemove"
    v-on:onPromote="onRemove"
  >
    <button class="btn btn-outline-danger" v-on:click.prevent="onRemove">V</button>
  </TaskBase>
</template>

<script>
import TaskBase from "@/components/TaskList/TaskBase";

export default {
  name: "TaskListEntry",
  components: {
    TaskBase
  },
  props: {
    task: Object,
  },
  emits:["onRemove"],
  setup(props, { emit }) {
    return {
      onRemove: ()=> emit("onRemove")
    }
  }
}
</script>

<style scoped>

</style>
