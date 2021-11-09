<template>
  <div class="container">
    <div class="pt-5 row">
      <div class="col-4">
      </div>
      <div class="col-4">
        <h1 class="col m-0" data-bs-toggle="collapse" data-bs-target="#PomoTaskListCollapse" >
          Pomo List
        </h1>
      </div>
      <div class="col-4 d-flex align-items-center justify-content-end">
        <datepicker class="col" v-model="current_date" style="width:90px"/>
      </div>
    </div>
  </div>

  <TagTaskList
    tag="pomo"
    :date="current_date"
    :tasks="tasks"
    v-on:promoteTask="()=>{}"
  />
  <TaskAddBox v-on:createTask="onTaskAdd"/>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import TaskAddBox from "@/components/AddTask/TaskAddBox";
import TagTaskList from "./TagTaskList.vue"



export default {
  name: "PomoTaskList",
  components: {
    Datepicker,
    TagTaskList,
    TaskAddBox,
  },
  props:{
    tasks: Array,
  },
  emits: [
    "createTask"
  ],
  data(){
    return {
      current_date: new Date(),
    }
  },
  setup(props, { emit }) {
    return {
      onTaskAdd: (task) => {
        task['tags'] = ['pomo']
        emit("createTask", task)
      }
    }
  },
}
</script>

<style scoped>

</style>