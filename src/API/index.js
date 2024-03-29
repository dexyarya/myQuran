import axios from "axios";


// axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
}); 


export const apiDoa = axios.create({
    baseURL: import.meta.env.VITE_API_URL_DOA,
    headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
       
    },
    // withCredentials: true,

});


