import axios from "axios";

export default class LinkedTask{
    constructor(taskData, apiUrl) {
        this.apiUrl = apiUrl
        this.taskData = taskData
    }
    get taskID(){
        return this.taskData.task_id
    }

    get completed(){
        return this.taskData.completed
    }
    set completed(v){
        var bodyFormData = new FormData();
        bodyFormData.append('completed', v);
        axios.put(this.apiUrl +"/"+ this.taskData.url, bodyFormData)
        return this.taskData.completed = v
    }
    get description(){
        return this.taskData.description
    }
}
