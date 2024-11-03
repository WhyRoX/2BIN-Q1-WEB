import { Movie } from '../types';
import { useState } from 'react';

interface MovieItemProps {
  movie: Movie;
}

export const MovieItem = ({ movie }: MovieItemProps) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="movie" onClick={() => setIsShowing(!isShowing)}>
      <h3>{movie.title}</h3>
      <p>Par {'=>'} {movie.director}</p>
      {isShowing ? <p>{movie.description}</p> : null}
    </div>
  );
};
