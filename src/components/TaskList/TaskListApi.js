import axios from "axios";
import signal from "signal-js";

export default class TaskListApi{
    _taskIDs
    onChanged = signal()

    constructor(apiUrl, taskApi) {
        this.apiUrl = apiUrl
        this.taskApi = taskApi
    }

    async getTaskIDs(){
        if(this._taskIDs == null){
            this._taskIDs = await this.fetchAll()
            this.onChanged.trigger("changed")
        }
        return this._taskIDs
    }

    async addTaskID(taskID){
        let data = new FormData()
        data.append("task_id", taskID)
        await axios.post(this.apiUrl, data)
        this._taskIDs.push(taskID)
        console.log("trigger the onChanged changed")
        this.onChanged.trigger("changed")
    }

    async removeTaskID(taskID){
        let id = taskID.split("/")[1]
        await axios.delete(this.apiUrl + "/" + id)
        this._taskIDs = this._taskIDs.filter((entry) => entry !== taskID)
        this.onChanged.trigger("changed")
    }

    async fetchAll(){
        return await axios.get(this.apiUrl)
            .then(response => response.data)
    }

}
