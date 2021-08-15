
export default class TaskApi {
    everyDayTaskPrefix = "every_day_task/"
    oneTimeTaskPrefix = "one_time_task/"

    constructor(oneTimeTaskApi, everyDayTaskApi) {
        this.oneTimeTaskApi = oneTimeTaskApi
        this.everyDayTaskApi = everyDayTaskApi
    }

    async getTask(taskID){
        if(taskID.startsWith(this.everyDayTaskPrefix)){
            let id = taskID.substring(this.everyDayTaskPrefix.length)
            return await this.everyDayTaskApi.getTask(id)
        }else if (taskID.startsWith(this.oneTimeTaskPrefix)){
            let id = taskID.substring(this.oneTimeTaskPrefix.length)
            return await this.oneTimeTaskApi.getTask(id)
        }else{
            throw Error("unknown id prefix in" + taskID)
        }
    }
}
