<template>
  <div class="m-1 pb-0 task-item list-group-item">
    <SatisfyingCheckbox v-model:checked="checkedModel" />
    <input type="text" class="d-inline align-top todo-item-description" v-bind:value="description">
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
      checkedModel: useModelWrapper(props, emit, "completed"),
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


.completed > .todo-item-description{
  text-decoration: line-through
}
.not-completed > .todo-item-description{
}
</style>
