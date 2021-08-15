<template>
  <h1 class="pt-5" >{{ name }}</h1>
  <span class="d-flex justify-content-center">
    <ul class="p-0" style="width: 15cm">
      <draggable
          :list="dataTask"
          class="list-group"
          ghost-class="ghost"
          :group="{ name: 'tasks', pull: 'clone', put: putAble }"
          @change="onInternalChange"
      >
        <template #item="{ element }">
          <Task
              v-model:description="element.description"
              v-model:completed="element.completed"
          />
        </template>
      </draggable>
  </ul>
  </span>
  {{dataTask}}
</template>

<script>
import draggable from "vuedraggable";
import Task from "@/components/PomoTodos/Task";

function getSavedOrder(localStorageKey){
  let savedOrder = localStorage.getItem(localStorageKey)
  if(savedOrder == null){
    savedOrder = []
  }else{
    savedOrder = JSON.parse(savedOrder)
  }
  return savedOrder
}


function saveTaskOrder(localStorageKey, tasks){
  if(tasks.length > 0 ) {
    console.log("save order", tasks, "to", localStorageKey)
    let currentOrder = tasks.map((task) => task.url)
    localStorage.setItem(localStorageKey, JSON.stringify(currentOrder))
  }
}

function orderTasks(tasks, taskOrder){
  if(tasks.length <= 1){
    return tasks
  }
  let orderedTasks = []
  for (let taskUrl of taskOrder){
    orderedTasks.push(...tasks.filter((task) => task.url === taskUrl))
  }
  let newTasks = tasks.filter((task) => !taskOrder.includes(task.url))
  orderedTasks.push(...newTasks)
  return orderedTasks
}

export default {
  name: "TodoList",
  components: {Task, draggable},
  props:{
    name: String,
    tasks: Array,
    putAble: Boolean,
  },
  emits: ["update:tasks"],
  methods: {
    onInternalChange(){
      let tasks = this.dataTask
      let localStorageKey = this.name + " " + "order"
      saveTaskOrder(localStorageKey, tasks)
      this.$emit("update:tasks", tasks)
    },
    externalChange(){
      console.log(this.name, "watched change from ", this.dataTask, "to", this.tasks)
      let localStorageKey = this.name +" " + "order"
      let order = getSavedOrder(localStorageKey)
      let tasks = orderTasks(this.tasks, order)
      saveTaskOrder(localStorageKey, tasks)
      this.dataTask = tasks
    }
  },
  mounted() {
    let localStorageKey = this.name +" " + "order"
    let order = getSavedOrder(localStorageKey)
    this.dataTask = orderTasks(this.tasks, order)
  },
  watch: {
    tasks: function(newVal, oldVal){
      console.log(this.name, "watched change from ", oldVal,"to", newVal)
      let localStorageKey = this.name +" " + "order"
      let order = getSavedOrder(localStorageKey)
      let tasks = orderTasks(newVal, order)
      saveTaskOrder(localStorageKey, tasks)
      this.dataTask = tasks
    }
  },
  data(){
    return {
      dataTask: []
    }
  }
}
</script>

<style scoped>
</style>
