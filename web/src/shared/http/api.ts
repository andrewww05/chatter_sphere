import ky from "ky";

const api = ky.create({
    prefixUrl: process.env.APP_BACKEND_URL,
    headers: {},
    timeout: 4000,
});


export default api;
