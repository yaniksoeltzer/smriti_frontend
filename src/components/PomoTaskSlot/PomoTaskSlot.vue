<template>
  <div class="task-drop-slot" :class="pomoTask==null? 'empty':''">
    <draggable
        :list="taskList"
        class="list-group"
        ghost-class="ghost"
        item-key="id"
        :group="{ name: 'tasks', put: true, pull: true }"
        @change="onChange"
    >
      <template #item="{ element }">
        <PomoTask
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
import {computed} from "@vue/reactivity";
import {useModelWrapper} from "@/components/ModelWrapper";
import PomoTask from "@/components/PomoTaskSlot/PomoTask";

export default {
  name: "PomoTaskSlot",
  components: {
    draggable,
    PomoTask,
  },
  props: ["pomoTask", "pomoTaskListApi"],
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
    onChange: function(event){
      if('added' in event){
        this.pomoTask_ = event.added.element
      }
      if('removed' in event){
        this.removeCurrent()
      }
    },
    removeCurrent: function(){
      this.pomoTaskListApi.addTaskID(this.pomoTask_.id)
      this.pomoTask_ = undefined
    },
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
