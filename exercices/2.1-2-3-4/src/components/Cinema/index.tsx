import { Movie } from "../Movie";
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
        {movies.map((movie, index) => (
          <li key={index}>
        <h3>{movie.title}</h3>
        <p>{movie.director}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};