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
    changeStatus(requestId, newStatusId, oldStatusId){
        return axios.put(API_URL + `request?requestId=${requestId}&newStatusId=${newStatusId}&oldStatusId=${oldStatusId}` );
    }
    myRequests(params){
        return httpCommon.get(`/request/creator`, {params});
    }
    getMyRequest(id,statusId){
        const params = {
            "id": id,
            "statusId": statusId
        }
        return this.myRequests(params)
    }

}

export default new RequestService()