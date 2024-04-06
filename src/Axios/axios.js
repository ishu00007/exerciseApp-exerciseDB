import axios from "axios"
const instance = axios.create({
    //baseURL : "http://localhost:8000/api/v1"         
    baseURL : "https://exercisedb.p.rapidapi.com/exercises"
})

export default instance