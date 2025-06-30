import api from "./api";
import { toQuery } from "./_parse";

const API_PREFIX = "user";

async function REGISTER(payload) {
  return await api.post(`/${API_PREFIX}/register`, payload);
}

async function LOGIN(payload) {
  return await api.post(`/${API_PREFIX}/login`, payload);
}

async function CHECK() {
  return await api.get(`/${API_PREFIX}`);
}

async function LOGOUT() {
  return await api.get(`/${API_PREFIX}/logout`);
}

async function MODIFY({ formData, ...payload }) {
  return await api.patch(`/${API_PREFIX}?${toQuery(payload)}`, formData);
}

async function CHECK_PASSWORD(payload) {
  return await api.post(`/${API_PREFIX}/checkPassword`, payload);
}

export default { REGISTER, LOGOUT, MODIFY, LOGIN, CHECK_PASSWORD, CHECK };
