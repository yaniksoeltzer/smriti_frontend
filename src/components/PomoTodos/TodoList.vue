<template>
  <h1 class="pt-5">{{  taskList.name }}</h1>
  <ul class="list-group p-3">
    <div v-for="task in taskList.tasks" v-bind:key="task.task_id" >
      <Todo
          v-model:completed="task.completed"
          v-model:description="task.description"
      />
    </div>
  </ul>
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
