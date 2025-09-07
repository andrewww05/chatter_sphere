import ky from "ky";
import { kyClientOptions } from "./options";

const authorized = ky.create(kyClientOptions);
const unauthorized = ky.create(kyClientOptions);

const api = { authorized, unauthorized } as const;
Object.freeze(api);

export default api;
