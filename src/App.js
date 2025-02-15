import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from './hooks/ScrollToTop'
import { Home, Game, GameEngine, PortfolioGenerator, WorldExplorerMap } from './pages'
import { ThemeProvider } from '@mui/material'
import Theme from './Theme'

function App() {

  const theme = Theme

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/InfinityChess" element={<Game />} /> 
            <Route path="/InfinityChess/Engine" element={<GameEngine />} /> 
            <Route path="/PortfolioGenerator" element={<PortfolioGenerator />} /> 
            <Route path="/WorldExplorerMap" element={<WorldExplorerMap />} /> 
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
