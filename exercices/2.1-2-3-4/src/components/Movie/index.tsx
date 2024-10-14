export interface Movie {
  title: string;
  director: string;
}

export const Movie = ({ title, director }: Movie) => {
  return (
    <li>
      <strong>{title}</strong> - Réalisateur : {director}
    </li>
  );
};