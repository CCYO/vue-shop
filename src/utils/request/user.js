import api from "./api";

async function REGISTER(payload) {
  return await api.post("/user/register", payload);
}

async function LOGIN(payload) {
  return await api.post("/user/login", payload);
}

async function CHECK() {
  return await api.get(`/user`);
}

async function LOGOUT() {
  return await api.get("/user/logout");
}

// async function REMOVE(payload) {
//   return await api.delete("/user", { data: payload });
// }

// async function MODIFY(payload) {
//   return await api.patch("/user", payload);
// }

// async function READ(payload) {
//   return await api.get(`/user`);
// }

export default { REGISTER, LOGIN, CHECK, LOGOUT };
