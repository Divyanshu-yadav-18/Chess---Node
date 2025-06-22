import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { Game } from './Screens/game';
import { Landing } from './Screens/landing';


function App() {

  return (
    <>
    <div className='h-screen bg-slate-800'>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/game" element={<Game/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
