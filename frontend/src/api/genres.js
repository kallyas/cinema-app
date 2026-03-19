import api from "../lib/api";

export async function getGenres() {
  const { data } = await api.get("/api/genres");
  return data;
}
