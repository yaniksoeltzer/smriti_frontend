export default class EasyTimer {
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
