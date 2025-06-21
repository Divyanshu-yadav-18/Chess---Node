import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-4xl bg-sky-50 font-bold text-blue-600">Tailwind works!</h1>
      <button className='bg-red-800'>
        Join Room
      </button>
    </>
  )
}

export default App
