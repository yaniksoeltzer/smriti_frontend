<template>
  <div class="p-2 m-1 list-group-item d-flex flex-row " v-on:dblclick="onPromote">
    <SatisfyingCheckbox v-model:checked="checked_" />
    <span class="me-auto" >
      <span class="d-inline align-top todo-item-description" >{{description}}</span>
    </span>
    <button class="btn btn-outline-danger" v-on:click.prevent="onRemove">REMOVE</button>
  </div>
</template>

<script>
import SatisfyingCheckbox from "@/components/TaskList/SatisfyingCheckbox";
import {useModelWrapper} from "@/components/ModelWrapper";
export default {
  name: "TaskListEntry",
  components: {
    SatisfyingCheckbox
  },
  props: {
    description: String,
    completed: Boolean
  },
  emits:["update:completed", "onRemove", "onPromote"],
  setup(props, { emit }) {
    return {
      checked_: useModelWrapper(props, emit, "completed"),
      onRemove: ()=> emit("onRemove"),
      onPromote: () => emit("onPromote"),
    }
  }
}
</script>

<style scoped>

.todo-item-description{
  top: 15px;
  position: absolute;
  margin-left: 20px;
}

.ghost {
  opacity: 0.1;
  background: #c8ebfb;
}

</style>
