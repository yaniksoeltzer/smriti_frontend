<template>
  <div class="p-2 m-1 list-group-item d-flex flex-row " :class="alreadyDoneToday?'alreadyDoneToday':''" >
    <div class="align-top todo-item-description" >{{description}}</div>
  </div>
</template>

<script>

export default {
  name: "TaskListEntry",
  props: {
    description: String,
    alreadyDoneToday: Boolean,
  },
}
</script>

<style scoped>

.todo-item-description{
  margin-left: 20px;
  height: 20px;
}

.alreadyDoneToday{
  background: gray;
}

</style>
