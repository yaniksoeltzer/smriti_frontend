import axios from "axios";


export class EveryDayTask{
    constructor(url) {
        this.url = url
        this._completed = false
        this._description = "NOT SET JET"
        this.id = "NOT JET SET"
    }
    async fetchData(){
        //console.log("fetch task from", this.url)
        let taskData = await axios.get(this.url)
            .then(response => response.data)
        this.lastCompletion = new Date(taskData["lastcompletion"])
        if(this.lastCompletion == null){
            this._completed = false
        }else{
            let oneDay = 1000 * 60* 60 * 24
            let timeSinceLastCompletion = new Date().getTime() - this.lastCompletion.getTime()
            this._completed = timeSinceLastCompletion < oneDay;
        }
        this._description = taskData["description"]
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


export default class EveryDayTaskApi {
    tasks = {}
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    async getTask(taskID){
        if(taskID in this.tasks){
            return this.tasks[taskID]
        }
        let taskUrl = this.apiUrl + "/" + taskID
        let task = new EveryDayTask(taskUrl)
        await task.fetchData()
        this.tasks[taskID] = task
        return task
    }

    async fetchAll(){
        let tasksData = await axios.get(this.apiUrl)
            .then(response => response.data)
        let taskIDs = tasksData.map((taskData) => taskData['task_id'])
        let tasks = []
        for(let taskID of taskIDs){
            let task = await this.getTask(taskID)
            tasks.push(task)
        }
        return tasks
    }
}
