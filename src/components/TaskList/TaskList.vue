<template>
  <span class="justify-content-center">
    <ul class="p-0">
      <div v-if="orderedTasks.length === 0" class="task-drop-box row align-items-center">
        <span class="col-6 mx-auto">
          Drop Tasks Here
        </span>
      </div>
      <draggable
        :list="wrappedTasks"
        class="list-group"
        ghost-class="ghost"
        animation="200"
        item-key="_id"
        :group="{ name: 'task', pull: true, put: true }"
        @change="onInternalChange"
      >
        <template #item="{ element }">
          <TaskBase
            :task="element.task"
            v-on:onPromote="() => emitOnTaskPromote(element.task)"
          >
          <button class="btn btn-outline-danger" v-on:click.prevent="() => emitOnTaskRemove(element.task)">REMOVE</button>
        </TaskBase>
        </template>
      </draggable>
  </ul>
  </span>
</template>

<script>
import draggable from "vuedraggable";
import TaskBase from "@/components/TaskList/TaskBase";
import {AisBeforeBDay} from "../date_operations";



export default {
  name: "TodoList",
  components: {
    draggable,
    TaskBase,
  },
  props:{
    storageID: String,
    tasks: Array,
  },
  emits:[
    "removeTask",
    "promoteTask",
  ],
  data(){
    let storageKey =  this.storageID + " " + "order"
    let order = getSavedOrder(storageKey)
    return {
      storageKey: storageKey,
      order: order,
    }
  },
  computed:{
    wrappedTasks: function(){
      return this.orderedTasks
        .filter(task => {
          let createdInThePast = !AisBeforeBDay(new Date(task.createdAt), this.$store.state.today)
          let completed = ('completedAt' in task)
          let completedInPast = AisBeforeBDay(this.$store.state.today, new Date(task.completedAt))
          //console.log("completedInThePast", completedInPast)
          //console.log("(",createdInThePast,"&&",  !completed, ") || (", completed, "&& ", !completedInPast,") = ", ( createdInThePast && !completed) || ( completed && !completedInPast))
          return createdInThePast && ( !completed || ( completed && !completedInPast))
          }
        ).map(task => {return  {task:task}})
    },
    orderedTasks: function(){
      saveOrder(this.storageKey, this.order)
      return orderTaskListEntries(this.tasks, this.order)
    },
  },
  setup(props, { emit }) {
    return {
      emitOnTaskRemove: (task)=>{ emit('removeTask', task)},
      emitOnTaskPromote: (task)=>{ emit('promoteTask', task)},
    }
  },
  methods:{
    async onInternalChange(){
      console.log('on')
      this.order = this.wrappedTasks.map((wrapper) => wrapper.task._id)
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

.ghost {
  opacity: 0.1;
  background: #c8ebfb;
}

</style>
