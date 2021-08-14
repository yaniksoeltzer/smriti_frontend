<template>
  <div class="m-1 pb-0 task-item list-group-item">
    <SatisfyingCheckbox v-model:checked="checked_" />
    <span class="d-inline align-top todo-item-description" >{{description}}</span>
  </div>
</template>

<script>
import SatisfyingCheckbox from "@/components/PomoTodos/SatisfyingCheckbox";
import {useModelWrapper} from "@/components/PomoTodos/ModelWrapper";
export default {
  name: "Todo",
  components: {SatisfyingCheckbox},
  props: {
    description: String,
    completed: Boolean
  },
  emits:["update:completed"],
  setup(props, { emit }) {
    return {
      checked_: useModelWrapper(props, emit, "completed"),
    }
  }
}
</script>

<style scoped>
.task-item  {
}

.todo-item-description{
  top: 15px;
  position: absolute;
  margin-left: 20px;
}

.strike-through {
  text-decoration: line-through
}
</style>
