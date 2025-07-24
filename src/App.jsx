import Home from './components/HomePage'
import Game from './components/Game'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SelectPlayers from './components/SelectPlayers'

function App() {

  
  return (
    <>
      <div className="absolute top-0 left-0 flex justify-center
        w-screen h-screen bg-gradient-to-br
        from-stone-900 via-black to-stone-900
        items-center overflow-hidden">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/selectplayers" element={<SelectPlayers/>}/>
          </Routes>

        </div>
    </>
  )
}

export default App
