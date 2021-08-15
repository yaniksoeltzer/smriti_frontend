<template>
  <div class="p-2 m-1 list-group-item d-flex flex-row " :class="completed?'completed':''">
    <div class="align-top todo-item-description" >{{description}}</div>
    {{completed}}
  </div>
</template>

<script>

export default {
  name: "TaskListEntry",
  props: {
    description: String,
    completed: Boolean
  },
}
</script>

<style scoped>

.todo-item-description{
  margin-left: 20px;
  height: 20px;
}

.completed{
  background: gray;
}


</style>
