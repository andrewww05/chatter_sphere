import { Options } from 'ky';
import { CommonUtils } from "@/utils";

export const kyClientOptions: Options = {
    prefixUrl: process.env.APP_BACKEND_URL,
    headers: {
        Accept: 'application/json',
    },
    timeout: CommonUtils.isProduction() ? 4000 : false,
};
