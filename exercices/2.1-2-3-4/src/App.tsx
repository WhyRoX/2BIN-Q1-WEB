const Header = (props: { title: string }) => {
  return <h1>{props.title}</h1>;
}

interface MovieProps {
  title: string;
  director: string;
}

const Movie = ({ title, director }: MovieProps) => {
  return (
    <li>
      <strong>{title}</strong> - Réalisateur : {director}
    </li>
  );
}

interface CinemaProps {
  name: string;
  movies: MovieProps[];
}

const Cinema = ({ name, movies }: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {movies.map((movie, index) => (
          <Movie key={index} {...movie} />
        ))}
      </ul>
    </div>
  );
}

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movies = [
    { title: "Film 1 - Blop", director: "Director A" },
    { title: "Film 2 - Qqch", director: "Director B" },
  ];

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movies = [
    { title: "Film 1 - Test d'Or", director: "Director C" },
    { title: "Film 2 - Steak d'Or", director: "Director D" },
  ];

  const cinema3Name = "Kinepolis";
  const cinema3Movies = [
    { title: "Film 1 - Flic", director: "Director E" },
    { title: "Film 2 - Bruh", director: "Director F" },
  ];

  return (
    <div>
      <Header title={pageTitle} />
      <Cinema name={cinema1Name} movies={cinema1Movies} />
      <Cinema name={cinema2Name} movies={cinema2Movies} />
      <Cinema name={cinema3Name} movies={cinema3Movies} />
    </div>
  );
};

export default App;