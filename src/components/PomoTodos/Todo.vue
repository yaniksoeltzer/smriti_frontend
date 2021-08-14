<template>
  <div class="p-2 m-1 list-group-item d-flex flex-row ">
    <SatisfyingCheckbox v-model:checked="checked_" />
    <span>
      <span class="d-inline align-top todo-item-description" >{{description}}</span>
    </span>
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

.todo-item-description{
  top: 15px;
  position: absolute;
  margin-left: 20px;
}

</style>
