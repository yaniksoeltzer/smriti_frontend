<template>
  <TaskList
    :storageID="tag +' task list'"
    :tasks="tasksWithTag"
    v-on:removeTask="removeTaskFromList"
    v-on:promoteTask="emitOnTaskPromote"
  />
</template>

<script>
import TaskList from "@/components/TaskList/TaskList.vue"

export default {
  name: "TagTaskList",
  components: {
    TaskList
  },
  props:{
    tag: String,
    tasks: Array,
  },
  emits:[
    "promoteTask",
  ],
  setup(props, { emit }) {
    return {
      emitOnTaskPromote: (task)=>{ emit('promoteTask', task)},
    }
  },
  methods:{
    removeTaskFromList(task){
      console.log('remove tag ', this.tag, "from", task)
      task['tags'] = task['tags'].filter(tag => tag !== 'pomo')
    },
  },
  computed:{
    tasksWithTag: function (){
      if (this.tasks == null){
        return []
      }
      return this.tasks.filter(
        (t) => {
          if('tags' in t){
            return t['tags'].includes(this.tag)
          }
          return false
        })
    }
  }
}

</script>

<style scoped>
</style>
