const axios = require('axios');
import {createToast} from 'mosha-vue-toastify';


export default class PomoApi{
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }


    fetchNextPomo(){
        let url = this.apiUrl + "/next"
        return axios.get(url)
            .then((response) => {
                return parsePomo(response.data)
            })
            .catch(() => {
                apiError("Could not fetch next pomo!")
            })
    }

    stopPomodoro(){
        let url = this.apiUrl + "/stop"
        return axios.get(url)
            .then((response) => {
                return parsePomo(response.data)
            })
            .catch(()=>{
                apiError("Could not stop pomodoro!")
            })
    }

    startPomo(pomoType){
        let url = this.apiUrl + "/start"
        if(pomoType != null){
            url = url + "?pomoType="+pomoType
        }
        return axios.get(url)
            .then((response) => {
                return parsePomo(response.data)
            })
            .catch(()=>{
                apiError("Could not start pomodoro!")
            })
    }

    pausePomo(){
        let url = this.apiUrl + "/pause"
        return axios.get(url)
            .then((response) => {
                return parsePomo(response.data)
            })
            .catch(()=>{
                apiError("Could not pause pomodoro!")
            })
    }

    continuePomo(){
        let url = this.apiUrl + "/continue"
        return axios.get(url)
            .then((response) => {
                return parsePomo(response.data)
            })
            .catch(()=>{
                apiError("Could not continue pomodoro!")
            })
    }
}


function apiError(message){
    createToast(
        {title:"Error Accessing API", description:message},
        {type:"danger", timeout:10000})
}


function parsePomo(data){
    if(data == null){
        return null
    }
    return {
        pomoType:data["pomo_type"],
        duration:data['planned_duration_in_seconds']*1000,
        startedAt:"started_at" in data && data["started_at"] != null ? new Date(data["started_at"]) : null,
        pausedAt:"paused_at" in data && data["paused_at"] != null ? new Date(data["paused_at"]) : null,
        pausedTime: "paused_time_in_seconds" in data && data["paused_time_in_seconds"] != null ? data["paused_time_in_seconds"]*1000 : 0
    }
}
