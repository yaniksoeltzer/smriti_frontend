
export const pomoConfig = {
  times:{
    work:25*60*1000,
    break: 5*60*1000,
    bigBreak: 15*60*1000
  }
}

export default class PomoFactory {
  finishedPomoTypes = []

  get lastPomoType(){
    if(this.finishedPomoTypes.length === 0){
      return undefined
    }else {
      return this.finishedPomoTypes[this.finishedPomoTypes.length-1]
    }
  }

  get numberOfWorkPomos(){
    return this.finishedPomoTypes.filter((pomoType) => pomoType === "work").length
  }

  nextPomo(){
    let type = this.expectedNextPomoType
    this.finishedPomoTypes.push(type)
    return {
      pomoType:type,
      duration:pomoConfig.times[type],
    }
  }

  get expectedNextPomoType(){
    let lastPomoType = this.lastPomoType
    if(lastPomoType === undefined){
      return "work"
    }
    // always expect to be different from last one
    if(lastPomoType === "break" || lastPomoType === "big break"){
      return "work"
    }
    if(lastPomoType === "work"){
      // either break or big break
      let nWorkPomos = this.numberOfWorkPomos
      if( nWorkPomos % 4 === 0){
        return "big break"
      }else{
        return "break"
      }
    }
    throw Error("Could not get next pomo type! Unknown lastPomoType " + lastPomoType)
  }
}
