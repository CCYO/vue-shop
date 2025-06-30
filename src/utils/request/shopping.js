import api from "./api";
import { toQuery } from "./_parse";

const API_PREFIX = "shopping";

async function ADD(payload) {
  return await api.post(`/${API_PREFIX}`, payload);
}

async function REMOVE(payload) {
  return await api.delete(`/${API_PREFIX}`, payload);
}

async function MODIFY(payload) {
  return await api.patch(`/${API_PREFIX}`, payload);
}

async function ORDER(payload) {
  return await api.patch(`/${API_PREFIX}/order`, payload);
}

async function READ(payload) {
  return await api.get(`/${API_PREFIX}?${toQuery(payload)}`);
}

async function READ_LIST(payload, options) {
  return await api.get(`/${API_PREFIX}/listInCar?${toQuery(payload)}`, options);
}

export default { ADD, REMOVE, MODIFY, ORDER, READ, READ_LIST };
