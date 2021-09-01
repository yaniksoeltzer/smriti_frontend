<template>
  <div class="task-template-box" v-on:click="_onAddTask()">
    <div class="d-flex justify-content-center" >
      <span class="d-inline-flex p-2" >add task</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskAddButton",
  emits: ["taskAdd"],
  setup(props, { emit }) {
    return {
      _onAddTask: () => {
        emit("taskAdd")
      }
    }
  },
}
</script>

<style scoped>


.task-template-box{
  background: #d0d0d0;
  border-radius: 10px;
  border-style: dashed;
}

</style>