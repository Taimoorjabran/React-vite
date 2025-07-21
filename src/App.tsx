import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import {NavBuilder} from './components/DynamicNavigationBuilder'
import { NavBuilderUI } from './components/NavBuilder/NavBuilderUI'
import Timer from './components/Timer'
import Progessbar from './components/Progessbar'
import { DebounceThrottle } from './problems/debounceThrottle'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <NavBuilderUI /> */}
      {/* <Progessbar /> */}
      {/* <Timer /> */}
      <DebounceThrottle />
    </>
  )
}

export default App
