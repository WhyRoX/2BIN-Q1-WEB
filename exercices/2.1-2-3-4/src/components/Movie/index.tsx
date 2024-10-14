import './Movie.css';

export interface Movie {
  title: string;
  director: string;
}

export const Movie = ({ title, director }: Movie) => {
  return (
    <div className="movie">
      <h3>{title}</h3>
      <p>{director}</p>
    </div>
  );
};