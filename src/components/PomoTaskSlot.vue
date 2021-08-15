<template>
  <div class="task-drop-slot" :class="pomoTask==null? 'empty':''">
    <draggable
        :list="taskList"
        class="list-group"
        ghost-class="ghost"
        item-key="id"
        :group="{ name: 'tasks', put: true, pull: false }"
        @change="onChange"
    >
      <template #item="{ element }">
        <TaskListEntry
            v-model:description="element.description"
            v-model:completed="completed"
            @onRemove="removeCurrent"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskListEntry from "@/components/TaskList/TaskListEntry";
import {computed} from "@vue/reactivity";
import {useModelWrapper} from "@/components/ModelWrapper";

export default {
  name: "PomoTaskSlot",
  components: {
    draggable,
    TaskListEntry,
  },
  props: ["pomoTask"],
  emits: ["update:pomoTask"],
  computed:{
    taskList: function(){
      if(this.pomoTask == null){
        return []
      }
      return [this.pomoTask]
    }
  },
  setup(props, { emit }) {
    return {
      pomoTask_: useModelWrapper(props, emit, "pomoTask"),
    }
  },
  data(){
    return {
      completed : computed({
        get: () => {
          if(this.pomoTask == null){
            return false
          }
          return this.pomoTask.completed
        },
        set: (v) => {
          if(v){
            this.pomoTask_.completed = true
            setTimeout(()=>{
              this.removeCurrent()
            }, 500)

          }
        }
      })
    }
  },
  methods: {
    removeCurrent: function(){
      this.$emit('update:pomoTask', undefined)
    },
    onChange: function(event){
      console.log(event)
      if('added' in event){
        let newPomoTask = event.added.element
        this.pomoTask_ = newPomoTask
      }
      if('removed' in event){
        this.removeCurrent()
      }
    }
  }
}
</script>

<style scoped>
.task-drop-slot{
  background: #808080;
  height: 2cm;
  border-radius: 10px;
  border-style: dashed;
}
.empty{
  opacity: 0.4;
}

</style>
