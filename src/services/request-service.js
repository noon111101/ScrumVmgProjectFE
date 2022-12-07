import httpCommon from "@/http-common";
import axios from "axios";
const API_URL = 'http://localhost:8080/api/';
class RequestService{
    getAll(params){
        return httpCommon.get("/request", {params});
    }

    getRequest(id){
        return httpCommon.get(`/request/${id}`);
    }
    getCategoryReason(id){
        return httpCommon.get(`/request/categoryreason/${id}`);
    }
    addRequest(request){
        let requestForm = new FormData(request);
        return axios.post(API_URL + `request`, requestForm);
    }
}

export default new RequestService()