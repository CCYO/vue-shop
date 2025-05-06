import api from "./api";
import { toQuery } from "./_parse";

async function ADD(payload) {
  return await api.post("/myStore", payload);
}

async function REMOVE(data) {
  return await api.delete("/myStore", { data });
}

async function MODIFY(payload) {
  return await api.patch("/myStore", payload);
}

async function READ(payload) {
  const query = toQuery(payload);
  return await api.get(`/myStore?${query}`);
}

export default { ADD, REMOVE, MODIFY, READ };
