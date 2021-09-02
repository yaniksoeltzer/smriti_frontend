<template>
  <h1 class="pt-5" >{{ name }}</h1>
  <span class="justify-content-center">
    <ul class="p-0">
      <div v-if="orderedTasks.length === 0" class="task-drop-box row align-items-center">
        <span class="col-6 mx-auto">
          Drop Tasks Here
        </span>
      </div>
      <draggable
        :list="orderedTasks"
        class="list-group"
        ghost-class="ghost"
        animation="200"
        item-key="_id"
        :group="{ name: 'task', pull: true, put: true }"
        @change="onInternalChange"
      >
        <template #item="{ element }">
          <TaskListEntry
            :description="element.description"
            :completed="false"
            :task="element"
            @onRemove="()=> emitOnTaskRemove(element)"
            @onComplete="() => emitOnTaskComplete(element)"
            @onInComplete="() => emitOnTaskInComplete(element)"
            @onPromote="() => emitOnTaskPromote(element)"
          />
        </template>
      </draggable>
  </ul>
  </span>
</template>

<script>
import draggable from "vuedraggable";
import TaskListEntry from "@/components/TaskList/TaskListEntry";

export default {
  name: "TodoList",
  components: {TaskListEntry, draggable},
  props:{
    name: String,
    tasks: Array,
  },
  emits:[
    "removeTask",
    "completeTask",
    "inCompleteTask",
    "promoteTask",
  ],
  data(){
    let storageKey =  this.name + " " + "order"
    let order = getSavedOrder(storageKey)
    return {
      storageKey: storageKey,
      order: order,
    }
  },
  computed:{
    orderedTasks: function(){
      console.log('recalculate ordered Tasks')
      saveOrder(this.storageKey, this.order)
      return orderTaskListEntries(this.tasks, this.order)
    }
  },
  setup(props, { emit }) {
    return {
      emitOnTaskRemove: (task)=>{ emit('removeTask', task)},
      emitOnTaskComplete: (task)=>{ emit('completeTask', task)},
      emitOnTaskInComplete: (task)=>{ emit('inCompleteTask', task)},
      emitOnTaskPromote: (task)=>{ emit('promoteTask', task)},
    }
  },
  methods:{
    async onInternalChange(){
      this.order = this.orderedTasks.map((task) => task._id)
    },
  },
}

function saveOrder(storageKey, order){
  if(order.length > 0 ) {
    localStorage.setItem(storageKey, JSON.stringify(order))
  }
}

function getSavedOrder(storageKey){
  let savedOrder = localStorage.getItem(storageKey)
  if(savedOrder == null){
    savedOrder = []
  }else{
    savedOrder = JSON.parse(savedOrder)
  }
  return savedOrder
}


function orderTaskListEntries(taskListEntries, taskOrder){
  if(taskListEntries.length <= 1){
    return taskListEntries
  }
  let orderedTasks = []
  for (let taskUrl of taskOrder){
    orderedTasks.push(...taskListEntries.filter((task) => task._id === taskUrl))
  }
  let newTasks = taskListEntries.filter((task) => !taskOrder.includes(task._id))
  orderedTasks.push(...newTasks)
  return orderedTasks
}
</script>

<style scoped>
.task-drop-box{
  background: #808080;
  height: 3cm;
  opacity: 0.4;
  border-radius: 10px;
  border-style: dashed;
}
</style>
