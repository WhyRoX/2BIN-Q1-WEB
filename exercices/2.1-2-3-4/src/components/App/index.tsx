import { PageTitle } from "../PageTitle";
import { Cinema } from "../Cinema";
import { Header } from "../Header";
import { Footer } from "../Footer";
import './App.css';

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

//   Veuillez créer deux nouveaux composants : Header & Footer. Il doit être possible :

// d'ajouter n'importe quel type de contenu dans ces deux composants en tant qu'enfants.
// d'afficher un logo (une image) dont l'URL est à passer en propriété.

  return (
    <main>
      <Header
        logo="https://images.unsplash.com/photo-1615915468538-0fbd857888ca?q=80&w=1068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        children={<p>Les cinémas de Vinci</p>}
      >
      </Header>
      <PageTitle title={pageTitle} />
      <Cinema name={cinema1Name} movies={cinema1Movies} />
      <Cinema name={cinema2Name} movies={cinema2Movies} />
      <Cinema name={cinema3Name} movies={cinema3Movies} />
      <Footer children={<p>© 2024 - Tous droits réservés</p>} />
    </main>
  );
};

export default App;
