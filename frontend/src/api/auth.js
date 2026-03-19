import api from "../lib/api";

export async function signIn(credentials) {
  const { data } = await api.post("/api/users/login", credentials);
  return data;
}

export async function signUp(credentials) {
  const { data } = await api.post("/api/users/signup", credentials);
  return data;
}
