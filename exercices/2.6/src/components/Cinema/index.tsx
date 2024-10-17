import { Movie } from "../types";
import { MovieItem } from "../MovieItem";
import "./Cinema.css";

export interface CinemaProps {
  name: string;
  movies: Movie[];
}

export const Cinema = ({ name, movies }: CinemaProps) => {
  return (
    <div className="cinema">
      <h2>{name}</h2>
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