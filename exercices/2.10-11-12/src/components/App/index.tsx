import { Header } from "../Header";
import { Footer } from "../Footer";
import './App.css';
import { Navbar } from "../Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <main>
      <Header
        logo="https://images.unsplash.com/photo-1615915468538-0fbd857888ca?q=80&w=1068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        children={
          <p>Les cinémas de Vinci</p>
          <Navbar />
        }
      >
      </Header>
      <Outlet />
      <Footer children={<p>© 2024 - Tous droits réservés</p>} />
    </main>
  );
};

export default App;
