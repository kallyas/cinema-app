import api from "../lib/api";

export async function getMovies() {
  const { data } = await api.get("/api/movies");
  return data.movies;
}

export async function addMovie(movie) {
  const formData = new FormData();
  formData.append("title", movie.title);
  formData.append("numberInStock", movie.numberInStock);
  formData.append("genre", movie.genre);
  formData.append("description", movie.description);

  if (movie.image?.[0]) {
    formData.append("image", movie.image[0]);
  }

  const { data } = await api.post("/api/movies/addmovie", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  return data;
}
