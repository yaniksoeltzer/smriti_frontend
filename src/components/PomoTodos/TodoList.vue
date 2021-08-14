<template>
  <h1 class="pt-5">Pomo Tasks</h1>
  <ul class="list-group p-3">
    <div v-for="task in tasks" v-bind:key="task.task_id" >
      <Todo
          v-model:completed="task.completed"
          v-model:description="task.description"
      />
    </div>
  </ul>
  <div v-for="task in tasks" v-bind:key="task.task_id+'display'" >
    {{task}}
  </div>
  <form class="js-form"></form>
</template>

<script>
import Todo from "@/components/PomoTodos/Todo";
import LinkedTask from "./LinkedTask"
import axios from "axios";
export default {
  name: "TodoList",
  components: {Todo},
  props:{
    apiUrl: String
  },
  data(){
    return {
      tasks: []
    }
  },
  async mounted(){
    this.tasks = await axios.get(this.apiUrl+ "/pomo_tasks")
        .then(response => response.data)
        .then(tasks => tasks.map(taskData => new LinkedTask(taskData, this.apiUrl)))
  },
}
</script>

<style scoped>

</style>
