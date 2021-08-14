import axios from "axios";

export default class LinkedTask{
    constructor(taskData, apiUrl) {
        this.taskData = {
            "completed": false,
            "description": "NOT UPDATED JET",
            "task_id": 0,
            "task_type": "one_time"
        }
        this.apiUrl = apiUrl
        this.taskData = taskData
    }

    get completed(){
        return this.taskData.completed
    }
    set completed(v){
        console.log("update you know what")
        var bodyFormData = new FormData();
        bodyFormData.append('completed', v);
        axios.put(this.apiUrl + "/" + this.taskData.task_type + "_tasks/" + this.taskData.task_id, bodyFormData)
        return this.taskData.completed = v
    }
    get description(){
        return this.taskData.description
    }
}
