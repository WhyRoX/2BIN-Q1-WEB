import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Joke {
  joke: string;
  category: string;
}

function App() {
  const [joke, setJoke] = useState<Joke | undefined>(undefined);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("https://v2.jokeapi.dev/joke/Dark?type=single")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJoke({
          joke: data.joke ?? "NO JOKE",
          category: data.category ?? "NO CATEGORY"
        });
      });
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (!joke) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>Joke</h2>
        <p>{joke.joke}</p>
        <p>Category: {joke.category}</p>
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
