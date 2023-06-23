import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Demo from './Demo.jsx'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Demo />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Increment 
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          Decrement 
        </button>
      <button onClick={() => setCount((count) => count=0)}>
        Clear
        </button>
      </div>
      <div>
        <div>{count}</div>
      </div>
    </>
  )
}

export default App
