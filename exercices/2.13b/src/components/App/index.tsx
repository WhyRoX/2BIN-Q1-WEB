import { useState } from 'react'
import './App.css'
import RandomDog from '../RandomDog'

function App() {
  const [count, setCount] = useState(0)
  //button to update all 3 dogs
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <RandomDog key={`${refresh}1`} />
        <RandomDog key={`${refresh}2`} />
        <RandomDog key={`${refresh}3`} />
      </div>
      <button
        onClick={() => setRefresh(!refresh)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
        }}
      >
        Refresh Dogs
      </button>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count: number) => count + 1)}>
          count is {count}
        </button>
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
