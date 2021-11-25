<template>
  <div class="p-2 m-1 list-group-item d-flex flex-row " v-on:dblclick="onPromote">
    <SatisfyingCheckbox v-model:checked="checked_" :grayOut="!completedToday" />
    <span class="me-auto" >
      <span class="d-inline align-top todo-item-description" >{{task.description}}</span>
    </span>
    <slot></slot>
  </div>
</template>

<script>
import SatisfyingCheckbox from "@/components/TaskList/SatisfyingCheckbox";
import { computed } from 'vue'
import {isSameDay} from "../date_operations";

export default {
  name: "TaskListEntry",
  components: {
    SatisfyingCheckbox
  },
  props: {
    task: Object,
  },
  emits:["onRemove", "onPromote", "update:task"],
  computed:{
    completedToday: function(){
      console.log('DEBUG completedToday',this.completed && isSameDay(this.$store.state.today,this.completedAt))
      return this.completed && isSameDay(this.$store.state.today,this.completedAt)
    },
    completed: function(){
      return ('completedAt' in this.task)
    },
    completedAt: function(){
      if(!this.completed){
        throw Error("Cannot get completion date if not completed!")
      }
      return new Date(this.task.completedAt)
    }
  },
  setup(props, { emit }) {
    return {
      checked_: computed({
        get: () => {
          if('completedAt' in props.task){
            return props.task.completedAt != null
          }
          return false
        },
        set: (value) => {
          if(value){
            let task = props.task
            task['completedAt'] = new Date().toISOString()
            emit("update:task", task)
          }else{
            let task = props.task
            delete task.completedAt
            emit("update:task", task)
          }
        }
      }),
      onRemove: ()=> emit("onRemove"),
      onPromote: () => emit("onPromote"),
    }
  }
}
</script>

<style scoped>

.todo-item-description{
  top: 15px;
  position: absolute;
  margin-left: 20px;
}


</style>
