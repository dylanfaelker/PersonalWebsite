import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from './hooks/ScrollToTop'
import { Home, Game, GameEngine, PortfolioGenerator, WorldExplorerMap } from './pages'

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
