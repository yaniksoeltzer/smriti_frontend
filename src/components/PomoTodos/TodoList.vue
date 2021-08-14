<template>
  <h1 class="pt-5" >{{  taskList.name }}</h1>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <draggable
          :list="taskList.tasks"
          class="list-group"
          ghost-class="ghost"
          @start="dragging = true"
          @end="dragging = false"
      >
        <template #item="{ element }">
          <Todo
              v-model:description="element.description"
              v-model:completed="element.completed"
          />
        </template>
      </draggable>
  </ul>
  </span>

</template>

<script>
import TaskList from "@/components/PomoTodos/TaskList";
import draggable from "vuedraggable";
import Todo from "@/components/PomoTodos/Todo";

export default {
  name: "TodoList",
  components: {Todo, draggable},
  props:{
    taskList: TaskList
  },
}
</script>

<style scoped>
</style>
