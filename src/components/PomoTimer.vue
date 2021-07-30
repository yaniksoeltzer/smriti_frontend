<template>
  <div id="pomoTimer" class="card m-5 mx-auto" style="height: 19em; width: 30em">
    <div class="card-body position-relative">
      {{ startTime }}
      <p class="h3 position-absolute top-0 start-50 p-3 m-0 translate-middle-x">
        {{ pcounter.currentSessionNumber }}
        <span v-if="pcounter.isBreak">Break</span>
        <span v-if="pcounter.isBigBeak">BIG Break</span>
        <span v-if="pcounter.isWork">Work</span>
      </p>
      <p class="timeView h1 position-absolute top-50 start-50 p-3 m-0 translate-middle">
        {{pad(remainingMinutes)}}:{{pad(remainingSeconds)}}
      </p>
      <div class="position-absolute bottom-0 start-50 p-3 m-0 translate-middle-x">
        <button v-if="!running && !pause" v-on:click="startTimer" class="btn btn-primary mainButton" >START</button>
        <button v-if="running" v-on:click="pauseTimer" class="btn btn-danger mainButton" >STOP</button>
        <button v-if="pause" v-on:click="continueTimer" class="btn btn-danger mainButton" >CONTINUE</button>
      </div>
      <div class="position-absolute bottom-0 end-0 p-3 m-0 translate-middle-x">
        <div class="btn btn-outline-secondary skipButton" v-on:click="finishTimer">></div>
      </div>
  </div>
  </div>
</template>

<script>
const axios = require('axios');


class PCounter {
  currentSessionNumber = 0;
  workMinutes = 25 ;
  breakMinutes = 5 ;
  bigBreakMinutes = 15 ;
  constructor(sn){
    this.currentSessionNumber = sn
  }
  nextSession(){
      this.currentSessionNumber += 1;
  }
  get sessionDuration(){
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

export default {
  name: 'PomoTimer',
  props: {
    apiUrl: String
  },
  data(){
    return {
      info: "",
      remainingSeconds: 0,
      remainingMinutes: 0,
      pcounter: new PCounter(),
      running: false,
      pause: false,
      startTime: null,
    }
  },
  mounted(){
    this.resetTimer()
    axios
      .get(this.apiUrl)
      .then(response => {
        let currentSessionNumber = response["data"]["currentSessionNumber"]
        this.pcounter = new PCounter(currentSessionNumber)
        this.resetTimer()
    })
  },
  methods: {
    pad(n) {
      return n < 10 ? '0' + n : n
    },
    startTimer(){
      this.resetTimer()
      this.startTime = new Date()
      this.continueTimer()
    },
    resetTimer(){
      clearInterval(this.timer);
      this.timer = null;
      this.startTime = null;
      this.running = false
      this.pause = false
      this.remainingMinutes = this.pcounter.sessionDuration
      this.remainingSeconds = 0
    },
    continueTimer(){
      this.pause = false
      this.running = true
      this.endTime = new Date().getTime() +
                   ( this.remainingMinutes *60 *1000 ) +
                   ( this.remainingSeconds * 1000)
      this.timer = setInterval(this.update.bind(this), 1000);
    },
    pauseTimer(){
      clearInterval(this.timer);
      this.timer = null;
      this.running = false
      this.pause = true
    },
    finishTimer(){
      this.running = false
      clearInterval(this.timer);
      let durationInSeconds = (this.pcounter.sessionDuration - this.remainingMinutes) * 60 - this.remainingSeconds
      //TODO run music
      const formData = new FormData();
      formData.append('pomo_type', this.pcounter.sessionName);
      formData.append('duration_in_seconds', durationInSeconds);
      formData.append('start_time', this.startTime.toUTCString());
      formData.append('pomo_number', this.pcounter.currentSessionNumber);
      axios.post(this.apiUrl+'/log', formData)
      this.pcounter.nextSession()
      this.resetTimer()
    },
    update(){
      let difference = this.endTime - new Date().getTime();
      if(difference <= 0){
        this.finishTimer()
      }else{
        this.running = true
        this.remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        this.remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);
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
