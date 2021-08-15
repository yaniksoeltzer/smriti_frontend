<template>
  <div class="p-2 m-1 list-group-item d-flex flex-row " :class="completed?'completed':''" v-on:dblclick="onAddToPomo">
    <span class="me-auto">
      <div class="align-top todo-item-description" >{{description}}</div>
    </span>
    <button class="btn btn-outline-primary" v-on:click.prevent="onAddToPomo"> > </button>
  </div>
</template>

<script>

export default {
  name: "TaskListEntry",
  props: {
    description: String,
    completed: Boolean
  },
  setup(props, { emit }) {
    return {
      onAddToPomo: ()=> emit("onAddToPomo"),
    }
  }
}
</script>

<style scoped>

.todo-item-description{
  margin-left: 20px;
  height: 20px;
  top: 15px;
  position: absolute;
}

.completed{
  background: gray;
}


</style>
