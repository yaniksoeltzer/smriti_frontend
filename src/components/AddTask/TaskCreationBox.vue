<template>
    <div class="task-creation-box p-3">
      <div class="d-flex flex-row">
        <div class="me-auto" style="width:80%">
          <input type="text" v-model="description" v-on:keyup.enter="createTask" class="form-control" placeholder="get stuff done">
        </div>
        <button type="submit" class="btn btn-primary" v-on:click.prevent="createTask">create</button>
      </div>
    </div>
</template>

<script>

export default {
  name: "TaskCreationBox",
  emits:[
    "createTask"
  ],
  setup(props, { emit }) {
    return {
      _onAddTask: (task) => {
        emit("createTask", task)
      }
    }
  },
  data(){
    return {
      description: "",
    }
  },
  methods:{
    async createTask(){
      let task = {
        createdAt: new Date().toISOString(),
        description: this.description,
      }
      this._onAddTask(task)
      this.description=""
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