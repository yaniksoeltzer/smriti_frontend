<template>
  <div class="m-1 pb-0 task-item list-group-item">
    <SatisfyingCheckbox v-model:checked="checkedModel" />
    <input type="text" class="d-inline align-top todo-item-description" v-bind:value="description">
  </div>
</template>

<script>
import SatisfyingCheckbox from "@/components/SatisfyingCheckbox";
import { computed } from 'vue'
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
  setup(props, { emit }) {
    const completedModel = computed({
      get: () => props.completed,
      set: (value) => {
        emit('completed', value)
      }
    })

    return {
      checkedModel: completedModel,
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
