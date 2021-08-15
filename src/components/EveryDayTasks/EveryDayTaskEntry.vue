<template>
  <div class="p-2 m-1 list-group-item d-flex flex-row " :class="alreadyDoneToday?'alreadyDoneToday':''" v-on:dblclick="onAddToPomo">
    <span class="me-auto">
      <div class="align-top todo-item-description me-auto" >{{description}}</div>
    </span>
    <button class="btn btn-outline-primary" v-on:click.prevent="onAddToPomo"> > </button>
  </div>
</template>

<script>

export default {
  name: "TaskListEntry",
  props: {
    description: String,
    alreadyDoneToday: Boolean,
  },
  emits: ["onAddToPomo"],
  setup(props, { emit }) {
    return {
      onAddToPomo: ()=> emit("onAddToPomo"),
    }
  }
}
</script>

<style scoped>

.todo-item-description{
  top: 15px;
  position: absolute;
  margin-left: 20px;
  height: 20px;
}

.alreadyDoneToday{
  background: gray;
}

</style>
