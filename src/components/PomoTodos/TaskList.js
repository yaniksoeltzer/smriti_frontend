import axios from "axios";
import signal from 'signal-js';

export default class TaskList{


    constructor(apiUrl, taskFactory) {
        this.apiUrl = apiUrl
        this.taskFactory = taskFactory
        this.tasks = []
        this.taskChanged = signal()
        this.update()
    }

    async update(){
        let taskListIDs =  await axios.get(this.apiUrl)
            .then(response => response.data)
        let tasks = []
        for (const taskID of taskListIDs) {
            let task = await this.taskFactory.createTaskFromID(taskID)
            tasks.push(task)
        }
        this.tasks = tasks
        this.taskChanged.emit("tasks")
    }

}
