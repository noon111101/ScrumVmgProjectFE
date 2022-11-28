import httpCommon from "@/http-common";

class HolidayService{
    getAll(params){
        return httpCommon.get("/holiday", {params});
    }
    deleteHoliday(id){
        return httpCommon.delete("/holiday?id="+id);
    }
}

export default new HolidayService()