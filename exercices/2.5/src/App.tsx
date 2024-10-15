import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface AppProps {
  title: string;
  message: string;
}

function App({ title, message }: AppProps) {
  const [count, setCount] = useState(0);
  const handleSetCount = () => {
    setCount(count + 1);
  }

  const displayMessage = count >= 10 ? `${message} You are a master in the art of clicking!` : '';

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{title}</h1>
      <div className="card">
        <button onClick={handleSetCount}>
          count is {count}
        </button>
        {<p>{displayMessage}</p>}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
