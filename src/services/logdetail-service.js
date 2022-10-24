import httpCommon from "@/http-common";

class LogdtailService{
    getAll(params){
       return  httpCommon.get("/log/logList", {params});
    }

    getByUsers(params){
        return  httpCommon.get("/log/byUser", {params});
    }

    getByDate(params) {
        return httpCommon.get("/log/byDate", {params});
    }
    getAllByUser(params){
        return  httpCommon.get("/log/allByUser", {params});
    }
    getDepartment(params){
        return httpCommon.get("/log/byDepartment", {params});
    }

}

export default new LogdtailService();
