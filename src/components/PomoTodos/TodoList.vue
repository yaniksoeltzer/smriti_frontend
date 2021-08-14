<template>
  <h1 class="pt-5" >{{  taskList.name }}</h1>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <div v-for="task in taskList.tasks" v-bind:key="task.task_id" >
        <Todo
            v-model:completed="task.completed"
            v-model:description="task.description"
        />
      </div>
  </ul>
  </span>

</template>

<script>
import Todo from "@/components/PomoTodos/Todo";
import TaskList from "@/components/PomoTodos/TaskList";

export default {
  name: "TodoList",
  components: {Todo},
  props:{
    taskList: TaskList
  },
}
</script>

<style scoped>
</style>
