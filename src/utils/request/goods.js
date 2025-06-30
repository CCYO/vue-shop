import api from "./api";
import { toQuery } from "./_parse";

const API_PREFIX = "goods";

async function READ(payload) {
  const query = toQuery(payload);
  return await api.get(`/${API_PREFIX}?${query}`);
}

export default { READ };
