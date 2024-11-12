import { PageTitle } from "../PageTitle";
import { Movie } from "../types"
import { useState } from "react";
import { MovieList } from "../MovieList";
import { MovieAddForm } from "../MovieAddForm";

const MovieListPage = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const defaultMovies : Movie[] = [
    {
      title: "HAIKYU-THE DUMPSTER BATTLE",
      director: "Susumu Mitsunaka",
      description:
        "A high-energy sports anime movie focusing on the intense volleyball rivalry between Karasuno High and their fierce competitors.",
    },
    {
      title: "GOODBYE JULIA",
      director: "Mohamed Kordofani",
      description:
        "A high-energy sports anime movie focusing on the intense volleyball rivalry between Karasuno High and their fierce competitors.",
    },
    {
      title: "INCEPTION",
      director: "Christopher Nolan",
      description:
        "A mind-bending sci-fi thriller where a skilled thief, who enters people's dreams to steal secrets, is given a chance to have his criminal record erased if he can implant an idea into a target's subconscious.",
    },
    {
      title: "PARASITE",
      director: "Bong Joon-ho",
      description:
        "An Oscar-winning dark comedy thriller that examines class disparities through the story of two families — one wealthy, the other destitute — and their increasingly complicated relationship.",
    },
    {
      title: "THE WATCHERS",
      director: "Ishana Night Shyamalan",
      description:
        "A suspenseful thriller that follows a group of people who are under constant surveillance, leading them to uncover dark secrets about their observers and themselves.",
    },
    {
      title: "BAD BOYS: RIDE OR DIE",
      director: "Adil El Arbi, Bilall Fallah",
      description:
        "The latest installment in the action-packed Bad Boys franchise, featuring detectives Mike Lowrey and Marcus Burnett as they take on their most dangerous case yet.",
    },
    {
      title: "TENET",
      director: "Christopher Nolan",
      description:
        "A complex and visually stunning sci-fi action film where a protagonist embarks on a time-bending mission to prevent World War III, navigating through a world of temporal inversion.",
    },
    {
      title: "THE IRISHMAN",
      director: "Martin Scorsese",
      description:
        "An epic crime drama that chronicles the life of Frank Sheeran, a mob hitman, as he reflects on his involvement with the Bufalino crime family and the mysterious disappearance of his friend, Jimmy Hoffa.",
    },
    {
      title: "Flic",
      director: "Enes Yumer",
      description: "Un film de flic"
    },
    {
      title: "Bruh",
      director: "Enes Yumer 2e du nom",
    },
  ];

  const [movies, setMovies] = useState(defaultMovies);
  const onMovieAdd = (nMovie: Movie) => {
    setMovies([...movies, nMovie]);
  }


  return (
    <main>
      <PageTitle title={pageTitle} />
      <MovieList movies={movies} />

      <MovieAddForm onMovieAdd={onMovieAdd} />

        <br />
    </main>
  );
};

export default MovieListPage;
