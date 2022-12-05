import axios from "axios";
const API_URL = 'http://localhost:8080/api/furlough/';

 class FurloughService{
     getAllByYear(param){
         return axios.get(API_URL + "furloughByYear", {params:param})
     }
 }
 export default new FurloughService();