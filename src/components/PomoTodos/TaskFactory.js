import LinkedTask from "@/components/PomoTodos/LinkedTask";

export default class TaskFactory{
    allTasks = {}
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    async createTaskFromID(taskID){
        if (taskID in this.allTasks){
            console.log("reuse task", taskID)
            return this.allTasks[taskID]
        }
        let url = this.apiUrl +"/" + taskID
        let newTask = new LinkedTask(url)
        await newTask.fetchData()
        this.allTasks[taskID] = newTask
        return newTask
    }
}
