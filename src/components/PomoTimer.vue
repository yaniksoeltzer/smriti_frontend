<template>
  <div id="pomoTimer" class="card m-5 mx-auto" style="height: 19em; width: 30em">
    <div class="card-body position-relative">
      <p class="h3 position-absolute top-0 start-50 p-3 m-0 translate-middle-x">
        {{ pcounter.currentSessionNumber }}
        <span v-if="pcounter.isBreak">Break</span>
        <span v-if="pcounter.isBigBeak">BIG Break</span>
        <span v-if="pcounter.isWork">Work</span>
      </p>
      <p class="timeView h1 position-absolute top-50 start-50 p-3 m-0 translate-middle">
        {{ pad(minutes) }}:{{ pad(seconds) }}
      </p>
      <div class="position-absolute bottom-0 start-50 p-3 m-0 translate-middle-x">
        <button v-if="state === 'stopped'" v-on:click="startPomo" class="btn btn-primary mainButton" >START</button>
        <button v-if="state === 'running'" v-on:click="pausePomo" class="btn btn-danger mainButton" >STOP</button>
        <button v-if="state === 'paused'" v-on:click="continuePomo" class="btn btn-danger mainButton" >CONTINUE</button>
      </div>
      <div class="position-absolute bottom-0 end-0 p-3 m-0 translate-middle-x">
        <div class="btn btn-outline-secondary skipButton" v-on:click="finishPomo">></div>
      </div>
  </div>
  </div>
</template>

<script>
const axios = require('axios');
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

class PCounter {
  currentSessionNumber = 0;
  workMinutes = 25 ;
  breakMinutes = 5 ;
  bigBreakMinutes = 15 ;
  nextSession(){
      this.currentSessionNumber += 1;
  }
  get currentSessionTimeInMinutes(){
      if (this.isBigBeak) {
          return this.bigBreakMinutes;
      }
      if (this.isBreak) {
          return this.breakMinutes;
      }
      return this.workMinutes;
  }
  get sessionName(){
      if (this.isBigBeak) {
          return "Big Break";
      }
      if (this.isBreak) {
          return "Break";
      }
      return "Work";
  }

  get isBreak(){
      return (!this.isBigBeak) && (this.currentSessionNumber%2 === 1)
  }
  get isBigBeak(){
      return (this.currentSessionNumber%8 === 7)
  }
  get isWork(){
    return (this.currentSessionNumber%2 === 0)
  }
}

class EasyTimer {
  pausedAt = null
  endTime = undefined
  constructor(milliseconds) {
    this.pausedAt = new Date().getTime()
    this.endTime = this.pausedAt + milliseconds
  }
  continue(){
    if(!this.isPaused){
      // already running
      return
    }
    let difference = this.remainingTime
    this.endTime = this.pausedAt + difference
    this.pausedAt = null
  }
  pause(){
    this.pausedAt = new Date().getTime()
  }
  get isPaused(){
    return this.pausedAt != null
  }
  get remainingTime(){
    if(this.isPaused){
      return this.endTime - this.pausedAt
    }else{
      return Math.max(this.endTime - new Date().getTime(),0)
    }
  }
}

function pad(n){
  return n < 10 ? '0' + n : n
}

function apiError(message){
  createToast(
      {title:"Error Accessing API", description:message},
      {type:"danger", timeout:10000})
}

function pomoError(message){
  createToast(
      {title:"Error", description:message},
      {type:"danger", timeout:10000})
}

async function fetchCurrentPomo(apiUrl){
  let url = apiUrl + "/current"
  let currentPomo = await axios.get(url).then((response)=>{
    return response.data
  }).catch((e) => {
    apiError("Could not get current Pomodoro")
    console.log("error accessing " + url  ,e)
  })
  return currentPomo
}
async function fetchLastPomo(apiUrl){
  let lastPomo = await axios.get(apiUrl + "/last").then((response)=>{
    return response.data
  }).catch(()=>{
    apiError("Could not get last Pomodoro")
  })
  return lastPomo
}
async function fetchNextSessionNumber(apiUrl, pomoType){
  let todayFinishedWorkPomos = await axios.get(apiUrl + "/?today&pomo_type=work&finished").then((response)=>{
    return response.data
  }).catch(() => {
    apiError("Could not get today's work Pomodoro")
  })
  let currentSessionNumber
  if (pomoType === "work"){
    currentSessionNumber = 2 * (todayFinishedWorkPomos.length - 1) + 2
  }else if (pomoType === "break"){
    currentSessionNumber = 2 * (todayFinishedWorkPomos.length - 1) + 1
  }else if (pomoType === "big break"){
    currentSessionNumber = Math.max( Math.floor((todayFinishedWorkPomos.length / 4))*8 - 1, 7)
  }else{
    pomoError("Unknown pomo type " + pomoType)
  }
  return currentSessionNumber
}

function getNextPomoType(lastPomoType){
  if(lastPomoType === "work"){
    return "break"
  }else if(lastPomoType === "break"){
    return "work"
  }else if(lastPomoType === "big break"){
    return "work"
  }else{
    pomoError("Could not get next pomo type! Unknown lastPomoType " + lastPomoType)
  }
}

function getRemainingTime(fetchedPomo){
  let plannedDurationInSeconds = fetchedPomo['planned_duration_in_seconds']
  let startedAt = new Date(fetchedPomo["started_at"])
  let finishTime = startedAt.getTime() + plannedDurationInSeconds * 1000
  let remainingMilliseconds =  Math.max(finishTime - new Date().getTime(),0)
  return remainingMilliseconds
}

function playOnFirstInteraction(audio){
  let playPromise = audio.play()
  playPromise.catch(()=>{
    // Autoplay was prevented
    console.log("Autoplay was prevented, delay until first user input")
    function singleTimeEvent(){
      new Audio(require("../assets/sound_lock_in.mp3")).play()
      document.removeEventListener("click", singleTimeEvent)
      console.log("delayed autoplay continued")
    }
    document.addEventListener("click", singleTimeEvent)
  })
}


export default {
  name: 'PomoTimer',
  props: {
    apiUrl: String
  },
  data(){
    return {
      seconds: 0,
      minutes: 0,
      state: "stopped",
      pcounter: new PCounter(),
      running: false,
      pause: false,
      startTime: null,
      pomoID: null,
      timer: undefined
    }
  },
  async mounted() {
    let currentPomo = await fetchCurrentPomo(this.apiUrl)
    this.pcounter = new PCounter()
    if(currentPomo == null){
      console.log("Start new Pomodoro")
      let lastPomo = await fetchLastPomo(this.apiUrl)
      let lastPomoType = lastPomo["pomo_type"].toLowerCase()
      let pomoType = getNextPomoType(lastPomoType)
      let sessionNumber = await fetchNextSessionNumber(this.apiUrl,pomoType)
      this.pcounter.currentSessionNumber = sessionNumber
      let milliseconds = this.pcounter.currentSessionTimeInMinutes * 60 * 1000
      this.timer = new EasyTimer(milliseconds)
    }else{
      console.log("Continue already running Pomodoro", currentPomo)
      let pomoType = currentPomo["pomo_type"].toLowerCase()
      let sessionNumber = await fetchNextSessionNumber(this.apiUrl,pomoType)
      this.pcounter.currentSessionNumber = sessionNumber
      let remainingMilliseconds = getRemainingTime(currentPomo)
      this.timer = new EasyTimer(remainingMilliseconds)
      this.pomoID = currentPomo["pomo_id"]
      this.continuePomo()
    }
    this.updatePomoCard()
    setInterval(this.updatePomoCard.bind(this), 1000);
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
    startPomo(){
      // push to api
      const formData = new FormData();
      formData.append('pomo_type', this.pcounter.sessionName.toLowerCase());
      formData.append('planned_duration_in_seconds', (this.pcounter.currentSessionTimeInMinutes * 60).toString());
      formData.append('start_time', new Date().toUTCString());
      axios.post(this.apiUrl+'/', formData).catch(()=>{
        this.apiError("Could submit Pomodoro start")
      })
      this.continuePomo()
      this.updatePomoCard()
    },
    pausePomo(){
      this.state = "paused"
      this.timer.pause()
      this.updatePomoCard()
    },
    finishPomo(){
      this.state = "stopped"
      axios.get(this.apiUrl+'/' + this.pomoID + "/finish").catch(()=>{
        this.apiError("Could not submit pomodoro finish")
      })
      this.pcounter.nextSession()
      let milliseconds = this.pcounter.currentSessionTimeInMinutes * 60 * 1000
      this.timer = new EasyTimer(milliseconds)
      this.updatePomoCard()
    },
    continuePomo(){
      this.state = "running"
      this.playLockIn()
      this.timer.continue()
      this.updatePomoCard()
    },
    updatePomoCard(){
      this.updateRemainingTime()
      if(this.state === "running" && this.timer.remainingTime === 0){
        this.playSuccess()
        this.finishPomo()
      }
    },
    updateRemainingTime(){
      let remainingTime = this.timer.remainingTime
      this.minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
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
