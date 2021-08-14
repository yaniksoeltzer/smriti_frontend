<template>
  <h1 class="pt-5">Pomo Tasks</h1>
  <ul class="list-group p-3">
    <div v-for="task in tasks" v-bind:key="task.task_id" >
      <Todo v-bind="task" v-bind:task_id="task.task_id" @completed="(v) => toggleTask(task.task_id, v)" />
    </div>
  </ul>
  {{tasks}}
  <form class="js-form"></form>
</template>

<script>
import Todo from "@/components/Todo";
export default {
  name: "TodoList",
  components: {Todo},
  methods: {
    toggleTask: function(task_id, value){
      console.log(task_id)
      console.log("set task ",task_id," completion to", value)
      this.tasks.filter(t => t.task_id === task_id).forEach((t)=>{
        t.completed = value
      })
    }
  },
  data(){
    return {
      tasks: [
      {
        "completed": false,
        "description": "OT - never done",
        "task_id": 1,
        "task_type": "one_time"
      },
      {
        "completed": true,
        "description": "ED - done today",
        "task_id": 7,
        "task_type": "every_day"
      },
      {
        "completed": false,
        "description": "OT - never done (2)",
        "task_id": 2,
        "task_type": "one_time"
      },
      {
        "completed": true,
        "description": "ED - done today and yesterday",
        "task_id": 9,
        "task_type": "every_day"
      },
      {
        "completed": false,
        "description": "ED - never done",
        "task_id": 5,
        "task_type": "every_day"
      },
      {
        "completed": true,
        "description": "OT - done today",
        "task_id": 3,
        "task_type": "one_time"
      },
      {
        "completed": false,
        "description": "ED - done yesterday",
        "task_id": 8,
        "task_type": "every_day"
      },
      {
        "completed": false,
        "description": "ED - never done (2)",
        "task_id": 6,
        "task_type": "every_day"
      },
      {
        "completed": true,
        "description": "OT - done yesterday",
        "task_id": 4,
        "task_type": "one_time"
      }
    ]
    }
  }

}
</script>

<style scoped>

</style>
