import api from "./api";
import { toQuery } from "./_parse";

const API_PREFIX = "myStore";

async function ADD(payload) {
  return await api.post(`/${API_PREFIX}`, payload);
}

async function REMOVE(payload) {
  return await api.delete(`/${API_PREFIX}`, payload);
}

async function MODIFY(payload) {
  return await api.patch(`/${API_PREFIX}`, payload);
}

async function READ(payload) {
  const query = toQuery(payload);
  return await api.get(`/${API_PREFIX}?${query}`);
}

export default { ADD, REMOVE, MODIFY, READ };
