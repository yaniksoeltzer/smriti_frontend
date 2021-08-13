const axios = require('axios');

import {createToast} from 'mosha-vue-toastify';


function apiError(message){
    createToast(
        {title:"Error Accessing API", description:message},
        {type:"danger", timeout:10000})
}

export default class PomoApi{
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    parsePomo(data){
        if(data == null){
            return null
        }
        return {
            pomoType:data["pomo_type"],
            duration:data['planned_duration_in_seconds']*1000,
            startedAt:new Date(data["started_at"]),
            pomoID:data["pomo_id"]
        }
    }

    parseIntermission(data){
        if(data == null){
            return null
        }
        let intermission = {
            pomoIntermissionID: data["pomo_intermission_id"],
            startedAt:new Date(data["started_at"]),
        }
        let finishedAt = data["finished_at"]
        if (finishedAt != null){
            intermission.finishedAt = new Date(finishedAt)
        }
        return intermission
    }

    getIntermissionsFor(pomoID){
        return axios.get(this.apiUrl +"/"+pomoID+ "/intermission").then((response) => {
            return response.data.map((data) => this.parseIntermission(data))
        }).catch(() => apiError("Could not fetch pomo_intermissions!"))
    }
    addIntermission(pomoID){
        const formData = new FormData();
        formData.append('started_at', new Date().toISOString());
        return axios.post(this.apiUrl + '/'+ pomoID + "/intermission", formData )
            .then((response) => {
                return this.parseIntermission(response.data)
            }).catch(()=>{
                apiError("Could not insert new intermission!")
            })
    }
    finishIntermission(pomoID, intermissionID){
        const formData = new FormData();
        formData.append('finished_at', new Date().toISOString());
        return axios.put(this.apiUrl + '/'+ pomoID + "/intermission/"+ intermissionID, formData )
            .then((response) => {
                return this.parseIntermission(response.data)
            }).catch(()=>{
                apiError("Could not insert new intermission!")
            })
    }

    fetchCurrentPomo(){
        let url = this.apiUrl + "/current"
        return axios.get(url).then((response) => {
            return this.parsePomo(response.data)
        }).catch(() => apiError("could not fetch current pomo"))
    }
    fetchTodayFinishedPomos(){
        return axios.get(this.apiUrl + "/?today&finished").then((response) => {
            return response.data.map((data) => this.parsePomo(data))
        }).catch(() => apiError("Could not fetch today's finished pomos!"))
    }

    addPomo({pomoType, duration, startedAt}){
        const formData = new FormData();
        formData.append('pomo_type', pomoType);
        formData.append('planned_duration_in_milliseconds', duration);
        formData.append('start_time', startedAt.toUTCString());
        console.log("submit new pomo")
        return axios.post(this.apiUrl + '/', formData)
            .then((response) => {
                return response.data['pomo_id']
            }).catch(()=>{
                apiError("Could not insert new pomo!")
            })
    }
    finishPomodoro(pomoID){
        const formData = new FormData();
        formData.append('finished_at', new Date().toISOString());
        return axios.put(this.apiUrl+'/' + pomoID, formData) .catch(()=>{
            apiError("Could not finish pomodoro!")
        })
    }

}
