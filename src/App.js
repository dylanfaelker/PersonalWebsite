import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home'
import Game from './Game'
import GameEngine from './Game_engine'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/InfinityChess" element={<Game />} /> 
          <Route path="/InfinityChess/Engine" element={<GameEngine />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
