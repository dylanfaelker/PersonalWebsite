import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Game from './pages/Game'
import GameEngine from './pages/Game_engine'
import PortfolioGenerator from './pages/PortfolioGenerator'

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
