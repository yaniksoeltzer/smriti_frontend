import axios from "axios";


export class OneTimeTask{
    constructor(url) {
        this.url = url
        this._completed = false
        this._description = "NOT SET JET"
        this.id = "NOT JET SET"
    }
    async fetchData(){
        let taskData = await axios.get(this.url)
            .then(response => response.data)
        this._completed = taskData["completed_at"] != null
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


export default class OneTimeTaskApi {
    tasks = {}
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    async getTask(taskID){
        if(taskID in this.tasks){
            return this.tasks[taskID]
        }
        let taskUrl = this.apiUrl + "/" + taskID
        let task = new OneTimeTask(taskUrl)
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
