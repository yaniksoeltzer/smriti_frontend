import axios from "axios";

export default class TaskListApi{
    _taskIDs

    constructor(apiUrl, taskApi) {
        this.apiUrl = apiUrl
        this.taskApi = taskApi
    }

    async getTaskIDs(){
        if(this._taskIDs == null){
            let taskIDs = await this.fetchAll()
            this._taskIDs = taskIDs
        }else{
            return this._taskIDs
        }
    }

    async addTaskID(taskID){
        let data = new FormData()
        data.append("task_id", taskID)
        await axios.post(this.apiUrl, data)
    }

    async removeTaskID(taskID){
        let id = taskID.split("/")[1]
        await axios.delete(this.apiUrl + "/" + id)
        this._taskIDs = this._taskIDs.filter((entry) => entry.id !== taskID)
    }

    async fetchAll(){
        return await axios.get(this.apiUrl)
            .then(response => response.data)
    }

}
