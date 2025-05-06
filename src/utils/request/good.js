import api from "./api";
import { toQuery } from "./_parse";

async function READ(payload) {
  const query = toQuery(payload);
  return await api.get(`/good?${query}`);
}

export default { READ };
