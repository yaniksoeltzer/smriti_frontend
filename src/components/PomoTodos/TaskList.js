import axios from "axios";
import signal from 'signal-js';

export default class TaskList{
    constructor(apiUrl, taskFactory) {
        this.apiUrl = apiUrl
        this.taskFactory = taskFactory
        this._tasks = []
        this.taskChanged = signal()
        this.update()
    }
    get tasks(){
        return this._tasks
    }
    set tasks(tasks){
        this._tasks = tasks
    }
    async update(){
        let taskIDs =  await axios.get(this.apiUrl)
            .then(response => response.data)
        let tasks = []
        for (const taskID of taskIDs) {
            let task = await this.taskFactory.createTaskFromID(taskID)
            tasks.push(task)
        }
        this._tasks = tasks
        this.taskChanged.emit("tasks")
    }

}
