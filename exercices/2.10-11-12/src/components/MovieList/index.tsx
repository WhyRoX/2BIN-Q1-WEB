import { Movie } from "../types";
import { MovieItem } from "../MovieItem";
import "./Cinema.css";

export interface MovieListProps {
  movies: Movie[];
}

export const MovieList = ({movies}: MovieListProps) => {
  return (
    <div className="cinema">
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>
            <MovieItem movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};