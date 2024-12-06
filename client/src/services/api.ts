// /src/services/api.ts
import axios from "axios";

// The backend URL is configured using an environment variable (or you can hard-code it)
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"; // FastAPI Backend

// Create an Axios instance for making requests
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
