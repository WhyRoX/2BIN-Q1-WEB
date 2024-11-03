import { Movie } from "../types";
import { MovieItem } from "../MovieItem";
import "./Cinema.css";

export interface CinemaProps {
  movies: Movie[];
}

export const Cinema = ({movies }: CinemaProps) => {
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