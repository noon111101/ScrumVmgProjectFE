import httpCommon from "@/http-common";

class LogdtailService{
    getAll(params){
       return  httpCommon.get("/log/logList", {params});
    }

    getByUsers(params){
        return  httpCommon.get("/log/byUser", {params});
    }

    getByDate_UserCode(params) {
        return httpCommon.get("/log/byDate_Usercode", {params});
    }

    getLogsByDate_Department(params){
        return httpCommon.get("/log/byDate_Department", {params});
    }
    getAllByUser(params){
        return  httpCommon.get("/log/allByUser", {params});
    }
    getDepartment(params){
        return httpCommon.get("/log/byDepartment", {params});
    }

    getAllBySearch(params) {
        return httpCommon.get("/log/search", {params});
    }

}

export default new LogdtailService();
