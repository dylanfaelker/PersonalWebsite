import { Routes, Route } from "react-router-dom"
import { HomePage } from './home'
import { InfinityChessPage, AbbottPage } from './chess'
import { StockPortfolioPage } from './stockPortfolio'
import { WorldExplorerPage } from './worldExplorer'
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
