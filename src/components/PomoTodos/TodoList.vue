<template>
  <h1 class="pt-5" >{{ name }}</h1>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <draggable
          :list="tasks"
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
  {{tasks}}
</template>

<script>
import draggable from "vuedraggable";
import Todo from "@/components/PomoTodos/Todo";
import TaskList from "@/components/PomoTodos/TaskList";

export default {
  name: "TodoList",
  components: {Todo, draggable},
  props:{
    name: String,
    taskList: TaskList,
  },
  data(){
    return {
      tasks: []
    }
  },
  mounted() {
    this.taskList.taskChanged.on("tasks", () =>{
      this.tasks = this.taskList.tasks
    })
  }
}
</script>

<style scoped>
</style>
