import axios from "axios";

export default class LinkedTask{
    constructor(url) {
        this.url = url
        this._completed = false
        this._description = "NOT SET JET"
        this.id = "NOT JET SET"
    }
    async fetchData(){
        //console.log("fetch task from", this.url)
        await axios.get(this.url)
            .then(response => response.data)
            .then(taskData => {
                this.id = taskData["id"]
                if (this.id.startsWith("every_day_task")){
                    this.lastCompletion = new Date(taskData["lastcompletion"])
                    if(this.lastCompletion == null){
                        this._completed = false
                    }else{
                        let oneDay = 1000 * 60* 60 * 24
                        let timeSinceLastCompletion = new Date().getTime() - this.lastCompletion.getTime()
                        this._completed = timeSinceLastCompletion < oneDay;
                    }
                }else if (this.id.startsWith("one_time_task")){
                    this._completed = taskData["completed_at"] != null
                }
                this._description = taskData["description"]
            })
    }

    get completed(){
        return this._completed
    }
    set completed(v){
        if(v){
            axios.get(this.url + "/complete").then(() => this.fetchData())
        }else{
            axios.get(this.url + "/incomplete").then(() => this.fetchData())
        }
    }
    get description(){
        return this._description
    }
}
