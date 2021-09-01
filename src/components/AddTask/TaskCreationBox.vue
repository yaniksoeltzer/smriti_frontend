<template>
    <div class="task-creation-box p-3">
      <div class="d-flex flex-row">
        <div class="me-auto" style="width:80%">
          <input type="text" v-model="description" v-on:keyup.enter="addTask" class="form-control" placeholder="get stuff done">
        </div>
        <button type="submit" class="btn btn-primary" v-on:click.prevent="addTask">create</button>
      </div>
    </div>
</template>

<script>
import OneTimeTaskApi from "../OneTimeTasks/OneTimeTaskApi";

export default {
  name: "TaskCreationBox",
  props:{
    oneTimeTaskApi: OneTimeTaskApi
  },
  emits:[
    "taskCreated"
  ],
  setup(props, { emit }) {
    return {
      _onAddTask: (task) => {
        emit("taskCreated", task)
      }
    }
  },
  data(){
    return {
      description: "",
    }
  },
  methods:{
    async addTask(){
      let task = await this.oneTimeTaskApi.createTask(this.description)
      this.description=""
      this._onAddTask(task)
    }
  }
}
</script>

<style scoped>

.task-creation-box{
  background: white;
  height: 2cm;
}

</style>