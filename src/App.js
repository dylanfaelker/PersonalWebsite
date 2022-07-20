import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home'
import Game from './Game'
import GameEngine from './Game_engine'
import PortfolioGenerator from './PortfolioGenerator'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/InfinityChess" element={<Game />} /> 
          <Route path="/InfinityChess/Engine" element={<GameEngine />} /> 
          <Route path="/PortfolioGenerator" element={<PortfolioGenerator />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
