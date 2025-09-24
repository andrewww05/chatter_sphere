import { getRequestConfig, RequestConfig } from "next-intl/server";
import { fallbackLocale, locales } from "./config";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }): Promise<RequestConfig> => {
    const requested = await requestLocale;

        const locale = hasLocale(locales, requested)
            ? requested
            : fallbackLocale;

    const messages = {
        "common": {...(await import(`../../messages/${locale}/common.json`)).default},
        "auth": {...(await import(`../../messages/${locale}/auth.json`)).default},
    }

    return {
        locale,
        messages,
    };
});
