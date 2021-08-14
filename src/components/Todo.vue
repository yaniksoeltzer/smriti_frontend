<template>
  <div class="m-1 pb-0 task-item list-group-item">
    <SatisfyingCheckbox :checked="completed" @checked="setChecked" />
    <input type="text" class="d-inline align-top todo-item-description" v-bind:value="description">
  </div>
</template>

<script>
import SatisfyingCheckbox from "@/components/SatisfyingCheckbox";

export default {
  name: "Todo",
  components: {SatisfyingCheckbox},
  props: {
    description: String,
    completed: Boolean
  },
  methods: {
    setChecked: function (value){
      this.$emit("completed", value)
    }
  },
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
