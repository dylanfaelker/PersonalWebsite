import { Routes, Route } from "react-router-dom"
import { HomePage } from './home'
import { InfinityChessPage, AbbottPage } from './chess'
import { StockPortfolioPage } from './stockPortfolio'
import { WorldExplorerPage } from './worldExplorer'
import { Navbar } from './commonComponents';
import { Box } from '@mui/material';

function App() {

  return (
    <Box>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/InfinityChess" element={<InfinityChessPage />} /> 
        <Route path="/InfinityChess/Engine" element={<AbbottPage />} /> 
        <Route path="/PortfolioGenerator" element={<StockPortfolioPage />} /> 
        <Route path="/WorldExplorerMap" element={<WorldExplorerPage />} /> 
      </Routes>
    </Box>
  );
}

export default App;
