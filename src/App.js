import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home'
import Game from './Pages/Game'
import GameEngine from './Pages/Game_engine'
import PortfolioGenerator from './Pages/PortfolioGenerator'

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
