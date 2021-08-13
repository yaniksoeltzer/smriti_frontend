<template>
  <h1 class="pt-5">Pomo Tasks</h1>
  <ul class="list-group p-3">
    <div v-for="task in tasks" :key="task.task_id" class="m-1 pb-0 task-item list-group-item">
      <SatisfyingCheckbox v-model="task.completed" />
      <div class="d-inline align-top todo-item-description">
        {{ task.description}}
      </div>
      <button class="btn btn-danger float-end js-delete-todo">delete</button>
    </div>
  </ul>
  <form class="js-form"></form>
</template>

<script>
import SatisfyingCheckbox from "@/components/SatisfyingCheckbox";
export default {
  name: "TodoList",
  components: {SatisfyingCheckbox},
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
.task-item  {
}

.todo-item-description{
  top: 15px;
  position: absolute;
  margin-left: 20px;
}


.completed > .todo-item-description{
  text-decoration: line-through
}
.not-completed > .todo-item-description{
}
</style>
