import axios from "axios";
import signal from 'signal-js';

export default class TaskListApi {
    constructor(apiUrl, taskApi) {
        this.apiUrl = apiUrl
        this.taskApi = taskApi
        this._taskIDs = []
        this.taskChanged = signal()
        this.fetchAll().then((taskIDs) => {
            this._taskIDs = taskIDs
        })
    }
    async fetchAll(){
        return await axios.get(this.apiUrl)
            .then(response => response.data)
    }

    get taskIDs(){
        return this._tasks
    }
    async add(taskID){
        let data = new FormData()
        data.append("task_id", taskID)
        await axios.post(this.apiUrl, data)
        this._taskIDs.push(taskID)
        this.taskChanged.emit("tasks")
    }

}
