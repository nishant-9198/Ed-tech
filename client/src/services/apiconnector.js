//we import axios to call we use axios ka fuction
import axios from "axios"

//we can call any req(get,put ects) using create() function
// we create instance of axios
export const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData,header,params)=>{
    return axiosInstance({
         method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: header ? header : null,  // ✅ FIXED HERE here i use header due to which i can get getenrolledcourses
    params: params ? params : null,
    })
}