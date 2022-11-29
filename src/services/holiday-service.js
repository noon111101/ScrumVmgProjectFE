import httpCommon from "@/http-common";
import axios from "axios";
const API_URL = 'http://localhost:8080/api/holiday/';
class HolidayService{
    getAll(params){
        return httpCommon.get("/holiday", {params});
    }
    deleteHoliday(id){
        return httpCommon.delete("/holiday?id="+id);
    }
    addHoliday(holiday){
        let holidayForm = new FormData(holiday)
        return axios.post(API_URL + 'add', holidayForm);
    }
}

export default new HolidayService()