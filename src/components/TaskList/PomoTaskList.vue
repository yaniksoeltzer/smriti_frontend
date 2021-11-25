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
      <TodayDatePicker />
    </div>
  </div>

  <TagTaskList
    tag="pomo"
    :tasks="tasks"
    v-on:promoteTask="()=>{}"
  />
  <TaskAddBox v-on:createTask="onTaskAdd"/>
</template>

<script>
import TaskAddBox from "@/components/AddTask/TaskAddBox";
import TagTaskList from "./TagTaskList.vue"
import TodayDatePicker from "./TodayDatePicker";



export default {
  name: "PomoTaskList",
  components: {
    TodayDatePicker,
    TagTaskList,
    TaskAddBox,
  },
  props:{
    tasks: Array,
  },
  emits: [
    "createTask"
  ],
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