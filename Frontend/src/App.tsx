import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter basename='/app'>
        <Routes>
          <Route path='/'/>{
            
          }

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
