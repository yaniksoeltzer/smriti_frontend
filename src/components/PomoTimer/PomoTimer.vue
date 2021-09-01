<template>
  <div class="card m-5 mx-auto timerCard">
    <div class="card-body position-relative">
      <p class="h3 position-absolute top-0 start-50 p-3 m-0 translate-middle-x">
        <span>{{ currentPomo.pomoType }}</span>

      </p>
      <p class="timeView h1 position-absolute top-50 start-50 p-3 m-0 translate-middle">
        {{ pad(remainingMinutes) }}:{{ pad(remainingSeconds) }}
      </p>
      <div class="position-absolute bottom-0 start-50 p-3 m-0 translate-middle-x">
        <button v-if="state === 'stopped'" v-on:click="startPomo" class="btn btn-primary mainButton" >START</button>
        <button v-if="state === 'paused'" v-on:click="continuePomo" class="btn btn-primary mainButton" >CONTINUE</button>
        <button v-if="state === 'running'" v-on:click="pausePomo" class="btn btn-danger mainButton" >PAUSE</button>
      </div>
      <div v-if="state !== 'stopped'" class="position-absolute bottom-0 end-0 p-3 m-0 translate-middle-x">
        <div class="btn btn-outline-secondary skipButton" v-on:click="stopPomo">></div>
      </div>
  </div>
  </div>
  <ul v-if="false">
    <li>state:{{ state }}</li>
    <li>startedAt:{{ currentPomo.startedAt }}</li>
    <li>finishedAt:{{ currentPomo.finishedAt }}</li>
    <li>duration:{{ currentPomo.duration }}</li>
    <li>remainingTime:{{ remainingTime }}</li>
  </ul>
</template>

<script>
import 'mosha-vue-toastify/dist/style.css'
import EasyTimer from "@/components/PomoTimer/easyTimer";
import PomoApi from "@/components/PomoTimer/pomoApi";
import {pad, playOnFirstInteraction} from "@/components/PomoTimer/common";


function playLockIn(){
  let audio = new Audio(require("../../assets/sound_lock_in.mp3"))
  playOnFirstInteraction(audio)
}

function playSuccess(){
  let audio = new Audio(require("../../assets/sound_success.mp3"))
  playOnFirstInteraction(audio)
}

export default {
  name: 'PomoTimer',
  props: {
    apiUrl: String
  },
  computed:{
    remainingSeconds(){
      return Math.floor((this.remainingTime % (1000 * 60)) / 1000);
    },
    remainingMinutes(){
      return Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    },
    state(){
      if(this.currentPomo.startedAt == null){
        return "stopped"
      }
      if(this.currentPomo.pausedAt != null) {
        return "paused"
      }
      return "running"
    },
  },
  data(){
    return {
      remainingTime: 0,
      currentPomo:{
        pomoType:"NOT SET JET",
        duration: 0,
        startedAt: null,
        pausedAt: null,
        finishedAt: null
      },
    }
  },
  async created() {
    this.pomoApi = new PomoApi(this.apiUrl)
    this.currentPomo = await this.pomoApi.fetchNextPomo()
    this.createNewTimer()
    this.update()
    setInterval(this.update,1000)
  },
  methods: {
    pad(n){
      return pad(n)
    },
    createNewTimer(){
      let elapsedTime = 0
      if(this.currentPomo.startedAt != null){
        let until = this.currentPomo.pausedAt || new Date()
        elapsedTime = until - this.currentPomo.startedAt - this.currentPomo.pausedTime
      }
      let remainingTime = this.currentPomo.duration - elapsedTime
      this.timer = new EasyTimer(remainingTime)
      if(this.state === "running"){
        this.timer.continue()
        playLockIn()
      }
      this.updateRemainingTime()
    },
    async startPomo(){
      this.currentPomo = await this.pomoApi.startPomo(null)
      this.createNewTimer()
    },
    async pausePomo(){
      this.currentPomo = await this.pomoApi.pausePomo()
      this.createNewTimer()
    },
    async continuePomo(){
      this.currentPomo = await this.pomoApi.continuePomo()
      this.createNewTimer()
    },
    async stopPomo(){
      await this.pomoApi.stopPomodoro()
      this.currentPomo = await this.pomoApi.fetchNextPomo()
      this.createNewTimer()
    },
    update(){
      this.updateRemainingTime()
      if(this.state === "running" && this.timer.remainingTime === 0){
        playSuccess()
        this.stopPomo()
      }
    },
    updateRemainingTime(){
      this.remainingTime = this.timer.remainingTime
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.timerCard{
  height: 19em;
}

.timeView{
  font-size: 8em
}

.mainButton{
    width: 10em
}

.skipButton{
  width: 2em
}

</style>
