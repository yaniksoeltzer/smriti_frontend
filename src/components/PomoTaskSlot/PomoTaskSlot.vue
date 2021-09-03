<template>
  <div class="task-drop-slot" :class="task==null? 'empty':''">
    <draggable
        :list="taskList"
        class="list-group"
        ghost-class="ghost"
        item-key="id"
        :group="{ name: 'tasks', put: true, pull: true }"
        @change="onChange"
    >
      <template #item="{ element }">
        <TaskBase
          :task="element"
          v-on:onPromote="() => emitOnTaskRemove(element)"
        >
          <button class="btn btn-outline-danger" v-on:click.prevent="() => emitOnTaskRemove(element)">V</button>
        </TaskBase>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskBase from "@/components/TaskList/TaskBase";

export default {
  name: "PomoTaskSlot",
  components: {
    draggable,
    TaskBase,
  },
  props: {
    task: Object
  },
  emits: ["onPomoTaskRemove"],
  computed:{
    taskList: function(){
      if(this.task == null){
        return []
      }
      return [this.task]
    }
  },
  setup(props, { emit }) {
    return {
      emitOnTaskInComplete: (task)=>{ emit('inCompleteTask', task)},
      emitOnTaskRemove: (task)=>{ emit('onPomoTaskRemove', task)},
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
