import { Options } from "ky";

export const kyClientOptions: Options = {
    prefixUrl: process.env.APP_BACKEND_URL,
    headers: {
        "Accept": "application/json",
    },
    timeout: 4000,
};