import React from "react";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";

import { search, categorize, filterRating } from "../../utils";
import { MoviesTable, Pagination } from "../../components";
import { Input, Loading, ListGroup } from "../../components/common";
import { getMovies } from "../../api/movies";
import { getGenres } from "../../api/genres";
import useMovieFiltersStore from "../../store/useMovieFiltersStore";

function Movies() {
  const pageSize = 12;
  const currentPage = useMovieFiltersStore((state) => state.currentPage);
  const currentGenre = useMovieFiltersStore((state) => state.currentGenre);
  const searchFilter = useMovieFiltersStore((state) => state.searchFilter);
  const rating = useMovieFiltersStore((state) => state.rating);
  const setCurrentPage = useMovieFiltersStore((state) => state.setCurrentPage);
  const setCurrentGenre = useMovieFiltersStore((state) => state.setCurrentGenre);
  const setSearchFilter = useMovieFiltersStore((state) => state.setSearchFilter);
  const setRating = useMovieFiltersStore((state) => state.setRating);
  const { data: movies = [], isLoading: moviesLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });
  const { data: genres = [], isLoading: genresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (moviesLoading || genresLoading) {
    return (
      <div className="background-container pt-5">
        <Loading />
      </div>
    );
  }

  let filteredMovies = search(movies, searchFilter, "title");
  filteredMovies = categorize(filteredMovies, currentGenre);
  filteredMovies = filterRating(filteredMovies, rating);

  return (
    <div className="background-container">
      <div className="mx-5 py-5">
        <div className="row">
          <div className="col-lg-2 col-sm-12">
            <h4 className="text-muted text-left p-1">Filters</h4>
            <ListGroup
              active={currentGenre}
              onChange={setCurrentGenre}
              options={genres}
            />

            <Input
              onChange={(event) => setRating(Number(event.target.value) || 0)}
              label="Rating"
              min={0}
              max={10}
              placeholder="0-10"
              type="number"
              iconClass="fas fa-star"
              value={rating}
            />
          </div>

          <div className="col-lg-10 col-sm-12">
            <Input
              onChange={(event) => setSearchFilter(event.target.value)}
              label="Search Movie"
              iconClass="fas fa-search"
              placeholder="Search..."
              value={searchFilter}
            />
            <p className="text-left text-muted">
              {!!filteredMovies.length ? `${filteredMovies.length}` : "0"}
              movies found.
            </p>

            {!_.isEmpty(filteredMovies) ? (
              <MoviesTable
                pageSize={pageSize}
                currentPage={currentPage}
                movies={filteredMovies}
              />
            ) : (
              <h1 className="text-white">No Movies</h1>
            )}
            <br />

            <Pagination
              itemsCount={filteredMovies.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
