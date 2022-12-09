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
        return axios.post(API_URL + `request`, request);
    }
    changeStatus(requestId, statusId){
        return axios.put(API_URL + `request?requestId=${requestId}&statusId=${statusId}` );
    }
    myRequests(params){
        return httpCommon.get(`/request/creator`, {params});
    }
}

export default new RequestService()