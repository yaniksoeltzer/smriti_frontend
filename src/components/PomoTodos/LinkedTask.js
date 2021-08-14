import axios from "axios";

export default class LinkedTask{
    constructor(url) {
        this.url = url
        this._completed = false
        this._description = "NOT SET JET"
        this.id = "NOT JET SET"
    }
    async fetchData(){
        console.log("fetch task from", this.url)
        await axios.get(this.url)
            .then(response => response.data)
            .then(taskData => {
                this._completed =  false
                this._description = taskData["description"]
                this.id = taskData["id"]
            })
    }

    get completed(){
        return this._completed
    }
    set completed(v){
        let bodyFormData = new FormData();
        bodyFormData.append('completed', v);
        axios.put(this.url, bodyFormData)
        return this._completed = v
    }
    get description(){
        return this._description
    }
}
