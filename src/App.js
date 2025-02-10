import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from './hooks/ScrollToTop'
import Home from './Pages/Home'
import Game from './Pages/Game'
import GameEngine from './Pages/Game_engine'
import PortfolioGenerator from './Pages/PortfolioGenerator'
import WorldExplorerMap from './Pages/WorldExplorerMap'

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/InfinityChess" element={<Game />} /> 
          <Route path="/InfinityChess/Engine" element={<GameEngine />} /> 
          <Route path="/PortfolioGenerator" element={<PortfolioGenerator />} /> 
          <Route path="/WorldExplorerMap" element={<WorldExplorerMap />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
