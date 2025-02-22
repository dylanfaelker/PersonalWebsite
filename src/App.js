import { Routes, Route } from "react-router-dom"
import { Home, Game, GameEngine, PortfolioGenerator, WorldExplorerMap } from './pages'
import { Navbar } from './components/common';
import { Box } from '@mui/material';

function App() {

  return (
    <Box>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/InfinityChess" element={<Game />} /> 
        <Route path="/InfinityChess/Engine" element={<GameEngine />} /> 
        <Route path="/PortfolioGenerator" element={<PortfolioGenerator />} /> 
        <Route path="/WorldExplorerMap" element={<WorldExplorerMap />} /> 
      </Routes>
    </Box>
  );
}

export default App;
