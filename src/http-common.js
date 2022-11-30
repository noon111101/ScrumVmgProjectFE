import axios from "axios";
export const jsonAPI = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers:{
        "Content-type": 'application/json'
    }
})
export const faceAPI = axios.create({
    baseURL: 'https://192.168.45.45:5001/',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    },
})
export default axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers:{
        enctype:"multipart/form-data",
        "Content-type": 'application/octet-stream',

        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        processData: false,
    }
})