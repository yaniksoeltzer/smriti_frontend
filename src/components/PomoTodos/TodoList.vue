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
  {{tasks}}
  <form class="js-form"></form>
</template>

<script>
import Todo from "@/components/PomoTodos/Todo";
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
    await axios.get(this.apiUrl).then(response => this.tasks = response.data)
  },
}
</script>

<style scoped>

</style>
