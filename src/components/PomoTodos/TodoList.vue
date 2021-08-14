<template>
  <h1 class="pt-5" >{{ name }}</h1>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <draggable
          :list="tasks"
          class="list-group"
          ghost-class="ghost"
          @end="saveOrder()"
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
      tasks: [],
      localStorageKey: this.name +" " + "order"
    }
  },
  methods: {
    saveOrder: function(){
      let currentOrder = this.tasks.map((task) => task.id)
      localStorage.setItem(this.localStorageKey,JSON.stringify(currentOrder))
    },
    orderTasks(tasks){
      if(tasks.length <= 1){
        return tasks
      }
      let orderedTasks = []
      let savedOrder = localStorage.getItem(this.localStorageKey)
      if(savedOrder == null){
        savedOrder = []
      }else{
        savedOrder = JSON.parse(savedOrder)
      }
      for (let taskID of savedOrder){
        orderedTasks.push(...tasks.filter((task) => task.id === taskID))
      }
      let newTasks = tasks.filter((task) => !savedOrder.includes(task.id))
      orderedTasks.push(...newTasks)
      return orderedTasks
    },
  },
  mounted(){
    this.taskList.taskChanged.on("tasks", () =>{
      this.tasks = this.orderTasks(this.taskList.tasks)
      this.saveOrder()
    })
    let tasks = this.taskList.tasks
    if(tasks.length > 0){
      this.tasks = this.orderTasks(this.taskList.tasks)
      this.saveOrder()
    }
  }
}
</script>

<style scoped>
</style>
