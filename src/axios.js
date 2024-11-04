import axios from "axios";
import { getToken } from "./utils/utils";

const http = axios.create({
    baseURL: "https://api.spotify.com/v1/browse/"
});

http.interceptors.request.use(async (config) => {
    const authToken = localStorage.getItem('token');
    
    if (authToken) {
        config.headers.Authorization = `${authToken}`;
    } else {
        console.log("Fetching new token...");
        await getToken(); 
        const newAuthToken = localStorage.getItem('token');
        
        if (newAuthToken) {
            config.headers.Authorization = `${newAuthToken}`; 
        } else {
            console.error("Failed to retrieve new token");
            throw new Error("No token available"); 
        }
    }
    
    return config;
});

http.interceptors.response.use(
    response => response,
    error => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            console.log("Unauthorized access - 401");
            // Handle unauthorized access
        } else if (status === 404) {
            console.log("Not found - 404");
            // Handle not found errors
        } else {
            console.log("An error occurred", error.message);
            // Handle other errors
        }

        return Promise.reject(error);
    }
);

export default http;
