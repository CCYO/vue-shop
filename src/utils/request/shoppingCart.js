import api from "./api";
import { toQuery } from "./_parse";

async function ADD(payload) {
  return await api.post("/shoppingCart", payload);
}

async function READ(payload) {
  return await api.get(`/shoppingCart?${toQuery(payload)}`);
}

export default { ADD, READ };
