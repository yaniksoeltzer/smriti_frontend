<template>
  <div id="pomoTimer" class="card m-5 mx-auto" style="height: 19em; width: 30em">
    <div class="card-body position-relative">
      <p class="h3 position-absolute top-0 start-50 p-3 m-0 translate-middle-x">
        <span>{{ currentPomo.pomoType }}</span>

      </p>
      <p class="timeView h1 position-absolute top-50 start-50 p-3 m-0 translate-middle">
        {{ pad(remainingMinutes) }}:{{ pad(remainingSeconds) }}
      </p>
      <div class="position-absolute bottom-0 start-50 p-3 m-0 translate-middle-x">
        <button v-if="state === 'stopped'" v-on:click="startPomo" class="btn btn-primary mainButton" >START</button>
        <button v-if="state === 'running'" class="btn btn-danger mainButton" >STOP</button>
      </div>
      <div class="position-absolute bottom-0 end-0 p-3 m-0 translate-middle-x">
        <div class="btn btn-outline-secondary skipButton" v-on:click="finishPomo">></div>
      </div>
  </div>
  </div>
  <ul>
    <li>id:{{ currentPomo.pomoID }}</li>
    <li>startedAt:{{ currentPomo.startedAt }}</li>
    <li>finishedAt:{{ currentPomo.finishedAt }}</li>
    <li>duration:{{ currentPomo.duration }}</li>
    <li>remainingTime:{{ remainingTime }}</li>
  </ul>
</template>

<script>
import 'mosha-vue-toastify/dist/style.css'
import PomoFactory from "@/components/pomoFactory"
import EasyTimer from "@/components/easyTimer";
import PomoApi from "@/components/pomoApi";
import {pad, playOnFirstInteraction} from "@/components/common";

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
      }else{
        return "running"
      }
    }
  },
  data(){
    return {
      remainingTime: 0,
      currentPomo:{
        pomoType:"NOT SET JET",
        duration: 0
      },
    }
  },
  async created() {
    this.pomoApi = new PomoApi(this.apiUrl)
    this.pomoFactory = new PomoFactory()
    let finishedPomos = await this.pomoApi.fetchTodayFinishedPomos()
    this.pomoFactory.finishedPomoTypes = finishedPomos.map(pomo => pomo.pomoType)
    let currentPomo = await this.pomoApi.fetchCurrentPomo()
    if(currentPomo == null){
      currentPomo = this.pomoFactory.nextPomo()
    }
    this.currentPomo = currentPomo
    if(this.currentPomo.startedAt != null){
      let remainingTime = this.currentPomo.duration
      console.log("continue already started pomo with, "+remainingTime+" time left")
      this.timer = new EasyTimer(remainingTime)
      this.continuePomo()
    }
    this.update()
    setInterval(this.update,1000)
  },
  methods: {
    pad(n){
      return pad(n)
    },
    playLockIn(){
      let audio = new Audio(require("../assets/sound_lock_in.mp3"))
      playOnFirstInteraction(audio)
    },
    playSuccess(){
      let audio = new Audio(require("../assets/sound_success.mp3"))
      playOnFirstInteraction(audio)
    },
    async startPomo(){
      this.currentPomo.startedAt = new Date()
      let pomoID = this.pomoApi.addPomo(this.currentPomo)
      this.currentPomo.pomoID = await pomoID
      this.timer = new EasyTimer(this.currentPomo.duration)
      this.continuePomo()
    },
    continuePomo(){
      this.playLockIn()
      this.timer.continue()
    },
    async finishPomo(){
      this.currentPomo.finishedAt = new Date()
      if(this.currentPomo.startedAt != null){
        // only when startedAt !== null we know that pomoID exists
        await this.pomoApi.finishPomodoro(this.currentPomo.pomoID)

      }
      this.currentPomo = this.pomoFactory.nextPomo()
      this.timer = new EasyTimer(this.currentPomo.duration)
      this.updateRemainingTime()
    },
    update(){
      this.updateRemainingTime()
      if(this.state === "running" && this.timer.remainingTime === 0){
        this.playSuccess()
        this.finishPomo()
      }
    },
    updateRemainingTime(){
      if(this.state === "running"){
        this.remainingTime = this.timer.remainingTime
      }
      if(this.state === "stopped"){
        this.remainingTime = this.currentPomo.duration
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
