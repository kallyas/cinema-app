import { create } from "zustand";

const useMovieFiltersStore = create((set) => ({
  currentPage: 1,
  currentGenre: "All",
  searchFilter: "",
  rating: 0,
  setCurrentPage: (currentPage) => set({ currentPage }),
  setCurrentGenre: (currentGenre) => set({ currentGenre, currentPage: 1 }),
  setSearchFilter: (searchFilter) => set({ searchFilter, currentPage: 1 }),
  setRating: (rating) => set({ rating, currentPage: 1 }),
}));

export default useMovieFiltersStore;
