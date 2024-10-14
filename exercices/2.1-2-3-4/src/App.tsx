interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <h1>{title}</h1>;
};

interface Movie {
  title: string;
  director: string;
}

const Movie = ({ title, director }: Movie) => {
  return (
    <li>
      <strong>{title}</strong> - Réalisateur : {director}
    </li>
  );
};

interface CinemaProps {
  name: string;
  movies: Movie[];
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
};

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movies = [
    { title: "HAIKYU-THE DUMPSTER BATTLE", director: "Susumu Mitsunaka " },
    { title: "GOODBYE JULIA", director: "Mohamed Kordofani" },
  ];

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movies = [
    { title: "THE WATCHER", director: "Ishana Night Shyamalan" },
    { title: "BAD BOYS: RIDE OR DIE", director: "Bilall Fallah" },
  ];

  const cinema3Name = "Kinepolis";
  const cinema3Movies = [
    { title: "Flic", director: "Enes Yumer" },
    { title: "Bruh", director: "Enes Yumer 2e du nom" },
  ];

  return (
    <div>
      <PageTitle title={pageTitle} />
      <Cinema name={cinema1Name} movies={cinema1Movies} />
      <Cinema name={cinema2Name} movies={cinema2Movies} />
      <Cinema name={cinema3Name} movies={cinema3Movies} />
    </div>
  );
};

export default App;
